const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const listTarget = [{
  dir: path.resolve(__dirname, 'src/public/images/heroes'),
},
{
  dir: path.resolve(__dirname, 'src/public/images'),
  option: [{
    name: 'logo.png',
    small: 180,
  }],
},
];

const compressDefaultImage = (target, image) => {
  const img = image.split('.');
  // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(path.resolve(__dirname, `${target}/${img[0]}-large.${img[1]}`));

  // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(path.resolve(__dirname, `${target}/${img[0]}-small.${img[1]}`));
};

const compressToSmallImage = (target, image, size) => {
  const img = image.split('.');

  // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(size)
    .toFile(path.resolve(__dirname, `${target}/${img[0]}-small.${img[1]}`));
};

const checkOption = (folder, options, image) => {
  if (options.some((option) => option.name === image)) {
    const check = options.filter((option) => option.name.match(image));
    compressToSmallImage(folder, image, check[0].small);
  }
};

const compress = (target, image) => {
  if (target.option) {
    return checkOption(target.dir, target.option, image);
  }
  return compressDefaultImage(target.dir, image);
};

const isImage = (file) => (/\.(jpe?g|png|svg)$/i).test(file);

listTarget.forEach((target) => {
  fs.readdirSync(target.dir)
    .forEach((file) => {
      if (isImage(file)) {
        compress(target, file);
      }
    });
});
