const express = require('express')
const basePath = process.cwd();
const { UploadFileToIpfs } = require(`${basePath}/models/ipfs`)
const { Combine } = require(`${basePath}/models/canvas`)
const router = express.Router()
require('dotenv').config()
const ipAddress = process.env.IP_ADDRESS
const port = process.env.PORT
const saveMetadata = (data, name) => {
    fs.writeFileSync(
        `${buildDir}/${name}.json`,
        JSON.stringify(data, null, 2)
    );
}

const AddAttributeToList = (list, trait, value) => {
    let temp = {
        "trait_type": trait,
        "value": value
    }
    list.push(temp)
    return list
}

router.post('/', async (req, res, next) => {
    var hand = req.body.hand
    var hat = req.body.hat
    var glasses = req.body.glasses
    var cloth = req.body.cloth
    var pant = req.body.pant
    var pet = req.body.pet
    var localPath = await Combine([pet, pant, cloth, glasses, hat, hand])
    let ipfs_path = await UploadFileToIpfs(`${basePath}/public/build/${localPath}.png`)
    let attributesList = []
    attributesList = AddAttributeToList(attributesList, 'hand', hand)
    attributesList = AddAttributeToList(attributesList, 'hat', hat)
    attributesList = AddAttributeToList(attributesList, 'glasses', glasses)
    attributesList = AddAttributeToList(attributesList, 'cloth', cloth)
    attributesList = AddAttributeToList(attributesList, 'pant', pant)
    attributesList = AddAttributeToList(attributesList, 'pet', pet)
    let tempMetadata = {
        name: 'test_name',
        description: 'test_description',
        image: ipfs_path,
        local_image: `http://${ipAddress}:${port}/build/${localPath}.png`,
        attributes: attributesList,
    };
    res.json(tempMetadata)
})

module.exports = router
