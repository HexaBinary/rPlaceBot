const dotenv = require('dotenv');
dotenv.config();

const { img, imgData } = require('./config.json');
const fs = require("fs");

const { Client, Intents, Collector } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
client.once('ready', () => {
    console.log('Ready!');
});

//Image Operations
const { createCanvas, loadImage } = require('canvas');
const { fstat } = require('fs');
const canvas = createCanvas(100, 100);
const ctx = canvas.getContext('2d');
loadImage(img).then(image => {
    ctx.drawImage(image, 0, 0)
    //console.log(canvas.toDataURL())
    for (let i = 0; i <= image.height; ++i) //y axis
    {
        for(let j = 0; j <= image.width; ++j) //x axis
        {
            let pixel = ctx.getImageData(j, i, image.width, image.height).data
            if(pixel[3] == 255)
            {
                var color;
                if(pixel[0] == 190 && pixel[1] == 0 && pixel[2] == 57) color ="color1";
                else if(pixel[0] == 255 && pixel[1] == 69 && pixel[2] == 0) color ="color2";
                else if(pixel[0] == 255 && pixel[1] == 168 && pixel[2] == 0) color ="color3";
                else if(pixel[0] == 255 && pixel[1] == 214 && pixel[2] == 53) color ="color4";
                else if(pixel[0] == 0 && pixel[1] == 163 && pixel[2] == 104) color ="color5";
                else if(pixel[0] == 0 && pixel[1] == 204 && pixel[2] == 120) color ="color6";
                else if(pixel[0] == 126 && pixel[1] == 237 && pixel[2] == 86) color ="color7";
                else if(pixel[0] == 0 && pixel[1] == 117 && pixel[2] == 111) color ="color8";
                else if(pixel[0] == 0 && pixel[1] == 158 && pixel[2] == 170) color ="color9";
                else if(pixel[0] == 36 && pixel[1] == 80 && pixel[2] == 164) color ="color10";
                else if(pixel[0] == 54 && pixel[1] == 144 && pixel[2] == 234) color ="color11";
                else if(pixel[0] == 81 && pixel[1] == 233 && pixel[2] == 244) color ="color12";
                else if(pixel[0] == 73 && pixel[1] == 58 && pixel[2] == 193) color ="color13";
                else if(pixel[0] == 106 && pixel[1] == 92 && pixel[2] == 255) color ="color14";
                else if(pixel[0] == 129 && pixel[1] == 30 && pixel[2] == 159) color ="color15";
                else if(pixel[0] == 180 && pixel[1] == 74 && pixel[2] == 192) color ="color16";
                else if(pixel[0] == 255 && pixel[1] == 56 && pixel[2] == 129) color ="color17";
                else if(pixel[0] == 255 && pixel[1] == 153 && pixel[2] == 170) color ="color18";
                else if(pixel[0] == 109 && pixel[1] == 72 && pixel[2] == 47) color ="color19";
                else if(pixel[0] == 156 && pixel[1] == 105 && pixel[2] == 38) color ="color20";
                else if(pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0) color ="color21";
                else if(pixel[0] == 137 && pixel[1] == 141 && pixel[2] == 144) color ="color22";
                else if(pixel[0] == 212 && pixel[1] == 215 && pixel[2] == 217) color ="color23";
                else if(pixel[0] == 255 && pixel[1] == 255 && pixel[2] == 255) color ="color24";
                else color = "error";

                //append to file
                pixelData = `x: ${j}, y: ${i} - ${color} rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})\n`;
                fs.appendFile(imgData,pixelData, (err) => {
                    if (err) throw err;
                });
            }
        }
    }
})

function ()

//Slash Command Handling
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
    
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'coords') {

        await interaction.reply('Coordinates: ');
    }
});

client.login(process.env.BOT_TOKEN);