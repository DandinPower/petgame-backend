const express = require('express')
const basePath = process.cwd();
const { UploadFileToIpfs } = require(`${basePath}/models/ipfs`)
const { Combine } = require(`${basePath}/models/canvas`)
const router = express.Router()
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
    var hatName = req.body.hatName
    var petName = req.body.petName
    await Combine(hatName, petName)
    let ipfs_path = await UploadFileToIpfs(`${basePath}/build/done.png`)
    let attributesList = []
    attributesList = AddAttributeToList(attributesList, 'Hat', hatName)
    attributesList = AddAttributeToList(attributesList, 'Pet', petName)
    let tempMetadata = {
        name: 'test_name',
        description: 'test_description',
        image: ipfs_path,
        attributes: attributesList,
    };
    res.json(tempMetadata)
})

module.exports = router