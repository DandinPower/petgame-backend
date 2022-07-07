const fs = require("fs");
const { listenerCount } = require("process");
const basePath = process.cwd();
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;

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
    default: "#000000",
};

const drawBackground = () => {
    ctx.fillStyle = background;
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

const Combine = async (_hatName, _petName) => {
    ctx.clearRect(0, 0, format.width, format.height);
    var petImage = await loadImage(`${basePath}/image/${_petName}.png`)
    var hatImage = await loadImage(`${basePath}/image/${_hatName}.png`)
    await drawBackground()
    await DrawImage(petImage)
    await DrawImage(hatImage)
    await saveImage('done')
}

module.exports = { Combine }
