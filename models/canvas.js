require('dotenv').config()
const fs = require("fs")
const crypto = require("crypto")
const { listenerCount } = require("process")
const basePath = process.cwd()
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`)
const { UploadFileToIpfs } = require(`${basePath}/models/ipfs`)
const { AddAttributeToList } = require(`${basePath}/models/function`)
const buildDir = `${basePath}/public/build`
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT

const format = {
    width: 512,
    height: 512,
    smoothing: false,
};

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;

const background = {
    generate: true,
    brightness: "80%",
    static: false,
    default: "#FFFFFF",
};

const drawBackground = async () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, format.width, format.height);
};

const saveImage = async (name) => {
    await fs.writeFileSync(
        `${buildDir}/${name}.png`,
        canvas.toBuffer("image/png")
    );
};

const saveMetadata = async (data, name) => {
    await fs.writeFileSync(
        `${buildDir}/${name}.json`,
        JSON.stringify(data, null, 2)
    );
}

const wait = (ms) => {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

const DrawImage = async (image) => {
    await ctx.drawImage(
        image,
        0,
        0,
        format.width,
        format.height
    )
}

const Combine = async (objectList) => {
    ctx.clearRect(0, 0, format.width, format.height);
    await drawBackground()
    for (let i = 0; i < objectList.length; i++) {
        var image = await loadImage(`${basePath}/public/image/${objectList[i]}.png`)
        await DrawImage(image)
    }
    var name = GetRandomName()
    await saveImage(name)
    return name
}

const GetRandomName = () => {
    var randomString = crypto.randomBytes(32).toString('hex').substr(0, 8)
    return randomString
}

const GetRandomFromList = (_list) => {
    return _list[Math.floor(Math.random() * _list.length)];
}

const GetRandomItemList = () => {
    var handList = ['hand_0', 'hand_1', 'none']
    var hatList = ['hat_0', 'hat_1', 'none']
    var glassesList = ['glasses_0', 'glasses_1', 'none']
    var clothList = ['cloth_0', 'cloth_1', 'none']
    var pantList = ['pant_0', 'pant_1', 'none']
    var petList = ['pet_0', 'pet_1']
    return [GetRandomFromList(petList), GetRandomFromList(pantList), GetRandomFromList(clothList), GetRandomFromList(glassesList), GetRandomFromList(hatList), GetRandomFromList(handList)]
}

const GetRandomNFT = async (_generateNums) => {
    for (let i = 0; i < _generateNums; i++) {
        var randomItemList = GetRandomItemList()
        var localPath = await Combine(randomItemList)
        let ipfs_path = await UploadFileToIpfs(`${basePath}/public/build/${localPath}.png`)
        let attributesList = []
        attributesList = AddAttributeToList(attributesList, 'hand', randomItemList[5])
        attributesList = AddAttributeToList(attributesList, 'hat', randomItemList[4])
        attributesList = AddAttributeToList(attributesList, 'glasses', randomItemList[3])
        attributesList = AddAttributeToList(attributesList, 'cloth', randomItemList[2])
        attributesList = AddAttributeToList(attributesList, 'pant', randomItemList[1])
        attributesList = AddAttributeToList(attributesList, 'pet', randomItemList[0])
        let tempMetadata = {
            name: 'nft_pet',
            description: 'this is cool',
            image: ipfs_path,
            local_image: `http://${ipAddress}:${port}/build/${localPath}.png`,
            attributes: attributesList,
        };
        await saveMetadata(tempMetadata, localPath)
    }
}

const UploadAllImageToIpfsByDir = async (_dir, start) => {
    var fs = require("fs")
    var itemList = []
    fs.readdir(_dir, async (err, list) => {
        itemList = list
        for (let i = start; i < itemList.length; i++) {
            await wait(1000)
            var localPath = itemList[i]
            let ipfs_path = await UploadFileToIpfs(`${_dir}/${localPath}`)
            let tempMetadata = {
                name: 'nft_item',
                description: 'this is cool',
                image: ipfs_path,
                local_image: `http://${ipAddress}:${_dir}/${localPath}`
            };
            await saveMetadata(tempMetadata, `${i}`)
        }
    })
}

module.exports = { Combine }


//GetRandomNFT(2)
UploadAllImageToIpfsByDir(`${basePath}/public/image`, 9)