require('dotenv').config()
const express = require('express')
const basePath = process.cwd();
const { UploadFileToIpfs } = require(`${basePath}/models/ipfs`)
const { Combine, GetBuildImagePath, GetNFTMetadata } = require(`${basePath}/models/canvas`)
const { AddAttributeToList, GetAttributeList } = require(`${basePath}/models/function`)
const router = express.Router()
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT

//基本組圖功能
router.post('/', async (req, res, next) => {
    var hand = req.body.hand
    var hat = req.body.hat
    var glasses = req.body.glasses
    var cloth = req.body.cloth
    var pant = req.body.pant
    var pet = req.body.pet
    var tokenId = req.body.tokenId
    var itemList = [pet, pant, cloth, glasses, hat, hand]
    await Combine(itemList, tokenId)
    let ipfsPath = await UploadFileToIpfs(`${basePath}/public/build/${tokenId}.png`)
    let attributesList = GetAttributeList(itemList)
    let tempMetadata = GetNFTMetadata('nft_pet', 'it is a cool pet', tokenId, ipfsPath, GetBuildImagePath(tokenId), attributesList)
    res.json(tempMetadata)
})

module.exports = router
