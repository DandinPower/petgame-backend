const fs = require("fs")
const crypto = require("crypto")
const { listenerCount } = require("process")
const basePath = process.cwd()
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`)
const buildDir = `${basePath}/public/build`

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

module.exports = { Combine }
