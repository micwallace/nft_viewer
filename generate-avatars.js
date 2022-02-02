
const Avatar = require('avatar-builder').default;
const {createCanvas} = require('canvas');
const fs = require('fs');

const dir = "./public/assets/ph-images";

import { DefaultItems } from 'src/DefaultItems'

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
}

const avatar = Avatar.builder(
    Avatar.Image.margin(Avatar.Image.roundedRectMask(Avatar.Image.compose(
        Avatar.Image.randomFillStyle(),
        Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {blur: 5, offsetX: 2.5, offsetY: -2.5,color:'rgba(0,0,0,0.75)'})
    ), 32), 8),
    128, 128);

function generateAvatars(table, index){

    avatar.create(table[index].desc).then(buffer => {

        console.log("Generating cat " + (index+1));

        fs.writeFileSync(dir + '/cat-' + (index+1) + '.png', buffer);

        index++;

        if (index < table.length)
            return generateAvatars(table, index);
    });
}

generateAvatars(DefaultItems, 0);