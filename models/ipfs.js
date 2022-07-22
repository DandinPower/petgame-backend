const ipfsClient = require("ipfs-api");
const fs = require("fs");
const ipfs = new ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const UploadFileToIpfs = async (_filename) => {
    var path = ''
    buffile = fs.readFileSync(_filename);
    await ipfs.add(buffile).then((fileinfo) => {
        path = "https://ipfs.io/ipfs/" + fileinfo[0].hash
    })
    return path
}

module.exports = { UploadFileToIpfs }
