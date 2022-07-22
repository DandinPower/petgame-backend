require('dotenv').config()
const fs = require("fs")
const crypto = require("crypto")
const { listenerCount } = require("process")
const basePath = process.cwd()
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`)
const { UploadFileToIpfs } = require(`${basePath}/models/ipfs`)
const { AddAttributeToList, GetAttributeList, GetRandomFromList, GetRandomItemList, GetRandomName, Wait } = require(`${basePath}/models/function`)
const buildDir = `${basePath}/public/build`
const componentDir = `${basePath}/public/image`

const componentIpfs = {
    'cloth_0': 'https://ipfs.io/ipfs/QmcgUMSF4TK8U1wkBqguxvm7jBaUdMq9EkapB9YbqHbwMH',
    'cloth_1': 'https://ipfs.io/ipfs/QmYhL3pXPnbNxzbvP7qYoRYx5RTY4A3EyBU4PcqwJzSFf1',
    'glasses_0': 'https://ipfs.io/ipfs/QmWvbcRVUG49DHhzDo61FdeGhZhj1fxjBkeYP5bWiWTrAY',
    'glasses_1': 'https://ipfs.io/ipfs/QmZJugaT5jqaMv8zLZeR2hRzknm33yGo6Q2p8UAU1E84jr',
    'hand_0': 'https://ipfs.io/ipfs/QmfFqHZnMEiS9fbSENadjppSHgMmFYX5FhjNsEDtdTzHNj',
    'hand_1': 'https://ipfs.io/ipfs/Qmd6zBhXzUn4VBiXDLTWgsLuUHM276MKg38sRCfVc2sqfm',
    'hat_0': 'https://ipfs.io/ipfs/QmVxvawprLNnYX6mRUxMoFsCVreh59qeocLJLVAVBJr37s',
    'hat_1': 'https://ipfs.io/ipfs/QmV8EeENBbaMDtT6P3RGtwNEKpzg9kEFeDgCJ5ZGMkxqB8',
    'none': 'https://ipfs.io/ipfs/QmSNZs6NQpbQccdrtXpmrRp2BmhWThvLsHgrHbAnEBFiH1',
    'pant_0': 'https://ipfs.io/ipfs/QmXzmeDZ6Kd7gLV3Yw8ynvLF4MfyAUhrE6Xj5WCe76CupY',
    'pant_1': 'https://ipfs.io/ipfs/QmSWSakdxHGrgmbLGt5vw33jkCvtUMBFEh1Gh4o61cbPL5',
    'pet_0': 'https://ipfs.io/ipfs/QmRGhsSspxKnwpDCRYCWw7g7WznCyuApcx1VqkWGiyXSny',
    'pet_1': 'https://ipfs.io/ipfs/QmUhoCfGLJ317i7j5pa3nVbQYC7gYTGj7jqG1iuypp2W9A'
}
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT

///canvas參數
const format = {
    width: 512,
    height: 512,
    smoothing: false,
};
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;

//繪製canvas背景
const DrawBackground = async () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, format.width, format.height);
};

//將目前的canvas圖檔存成png圖片
const SaveImage = async (_name) => {
    await fs.writeFileSync(
        `${buildDir}/${_name}.png`,
        canvas.toBuffer("image/png")
    );
};

//將json object儲存成json檔
const SaveMetadata = async (_data, _name) => {
    await fs.writeFileSync(
        `${buildDir}/${_name}.json`,
        JSON.stringify(_data, null, 2)
    );
}

//將圖片buffer畫進canvas
const DrawImage = async (image) => {
    await ctx.drawImage(
        image,
        0,
        0,
        format.width,
        format.height
    )
}

//NFT本體的metadata預設值
const GetNFTMetadata = (_name, _description, _tokenId, _image, _localImage, _attributesList) => {
    let tempMetadata = {
        name: _name,
        description: _description,
        token_id: _tokenId,
        image: _image,
        local_image: _localImage,
        attributes: _attributesList,
    };
    return tempMetadata
}

//NFT配件的metadata預設值
const GetComponentsMetadata = (_name, _description, _tokenId, _image, _localImage) => {
    let tempMetadata = {
        name: _name,
        description: _description,
        token_id: _tokenId,
        image: _image,
        local_image: _localImage
    };
    return tempMetadata
}

//回傳public/build的express圖片地址
const GetBuildImagePath = (_localPath) => {
    return `http://${ipAddress}:${port}/build/${_localPath}.png`
}

//回傳public/image的express圖片地址
const GetPublicImagePath = (_localPath) => {
    return `http://${ipAddress}:${port}/image/${_localPath}.png`
}

//根據給定的objectList生成圖片
const Combine = async (_objectList, name) => {
    ctx.clearRect(0, 0, format.width, format.height);
    await DrawBackground()
    for (let i = 0; i < _objectList.length; i++) {
        var image = await loadImage(`${basePath}/public/image/${_objectList[i]}.png`)
        await DrawImage(image)
    }
    await SaveImage(name)
}

//產生隨機的nft以及其配件
const GetRandomNFT = async (_tokenStart, _tokenEnd, _nftTotal, _componentStartIndex) => {
    var currentComponentStartIndex = _componentStartIndex
    for (let i = _tokenStart; i < _tokenEnd; i++) {
        var randomItemList = GetRandomItemList()
        await Combine(randomItemList, i)
        let ipfsPath = await UploadFileToIpfs(`${basePath}/public/build/${i}.png`)
        let attributesList = GetAttributeList(randomItemList)
        let tempMetadata = GetNFTMetadata('nft_pet', 'it is a cool pet', i, ipfsPath, GetBuildImagePath(i), attributesList)
        await SaveMetadata(tempMetadata, i)
        await GenerateComponentJson(randomItemList, _nftTotal, currentComponentStartIndex)
        currentComponentStartIndex += 5
    }
}

//將資料夾內的所有圖片上傳到ipfs
const UploadAllImageToIpfsByDir = async (_dir, _start) => {
    var fs = require("fs")
    fs.readdir(_dir, async (err, list) => {
        var itemList = list
        for (let i = _start; i < itemList.length; i++) {
            await Wait(1000)
            var localPath = itemList[i]
            let ipfsPath = await UploadFileToIpfs(`${_dir}/${localPath}`)
            console.log(`'${localPath.replace('.png', '')}' : '${ipfsPath}',`)
        }
    })
}

//根據給定的配件表以及token的global資訊來產生配件json
const GenerateComponentJson = async (_itemList, _nftTotal, _componentStartIndex) => {
    const itemName = ['pet', 'pant', 'cloth', 'glasses', 'hat', 'hand']
    var newOrder = [4, 3, 5, 1, 2]
    for (let i = 0; i < newOrder.length; i++) {
        var tokenId = _nftTotal + _componentStartIndex + i
        var index = newOrder[i]
        var tempMetadata = GetComponentsMetadata(itemName[index], 'component', tokenId, componentIpfs[_itemList[index]], GetPublicImagePath(_itemList[index]))
        await SaveMetadata(tempMetadata, tokenId)
    }
}

//根據給定的item編號生成nft
const GenerateSingleNFT = async (_itemList, _name, _description, _tokenId, _nftTotal, _componentStartIndex) => {
    await Combine(_itemList, _tokenId)
    let ipfsPath = await UploadFileToIpfs(`${basePath}/public/build/${_tokenId}.png`)
    let attributesList = GetAttributeList(_itemList)
    let tempMetadata = GetNFTMetadata(_name, _description, _tokenId, ipfsPath, GetBuildImagePath(_tokenId), attributesList)
    await SaveMetadata(tempMetadata, _tokenId)
    await GenerateComponentJson(_itemList, _nftTotal, _componentStartIndex)
}

module.exports = { Combine, UploadAllImageToIpfsByDir, GetRandomNFT, GetBuildImagePath, GetNFTMetadata }

//UploadAllImageToIpfsByDir(componentDir, 8)
//GetRandomNFT(8, 10, 100, 40)
//GenerateSingleNFT(['pet_1', 'pant_0', 'cloth_1', 'glasses_0', 'hat_1', 'hand_0'], 'nft_pet', 'it is a cool pat', 0, 100, 0)