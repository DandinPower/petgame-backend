require('dotenv').config()
const Moralis = require("moralis/node")
const serverUrl = process.env.DAPP_URL
const appId = process.env.APP_ID
const masterKey = process.env.MASTER_KEY

const InsertData = async (className, newObjectJson) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(className)
    const newClass = new Class()
    for (var attributename in newObjectJson) {
        newClass.set(attributename, object[attributename])
    }
    await newClass.save()
}

const FindQuery = async (className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(className)
    const query = new Moralis.Query(Class)
    query.limit(25)
    const object = await query.find()
    console.log(object)
    //console.log(object.get('height'))
};

const DeleteQuery = async (className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(className)
    const query = new Moralis.Query(Class)
    const object = await query.first()
    if (object) {
        object.destroy().then(() => {
            console.log('delete done');
        }, (error) => {
            console.log(error);
        });
    }
}

const UpdateData = async (className) => {
    await Moralis.start({ serverUrl, appId, masterKey })
    const Class = Moralis.Object.extend(className)
    const query = new Moralis.Query(Class)
    const object = await query.first()
    if (object) {
        object.set('height', 166)
        object.save().then(() => {
            console.log('update done');
        }, (error) => {
            console.log(error);
        });
    }
}

module.exports = { InsertData }