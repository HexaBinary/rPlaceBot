const dotenv = require('dotenv');
dotenv.config();

const { img, imgData, uidList, startX, startY } = require('./config.json');
const fs = require("fs");

const { createCanvas, loadImage } = require('canvas');
const { fstat } = require('fs');
const { hyperlink, hideLinkEmbed } = require('@discordjs/builders');
const { time, timeStamp } = require('console');
const canvas = createCanvas(100, 100);
const ctx = canvas.getContext('2d');
const { Client, Intents, Collector } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS]})
client.once('ready', () => {
    fs.writeFile(imgData,'', (err) => {});
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
                    pixelData = `${j+startX} ${i+startY} ${color} rgb(${pixel[0]},${pixel[1]},${pixel[2]})\n`;
                    fs.appendFile(imgData,pixelData, (err) => {
                        if (err) throw err;
                    });
                }
            }
        }
    })
    console.log('Ready!');
});

function uidCheck(uid)
{
    var data = fs.readFileSync(uidList, 'utf8');
    var lines = data.split('\n');
    for(var i = 0; i < lines.length; i++)
    {
        if(lines[i] == uid)
        {
            return;
        }
    }
    fs.appendFile(uidList,uid+'\n', (err) => {
        if (err) throw err;
    });
}

function coordlistCheck()
{
    var data = fs.readFileSync(uidList, 'utf8');
    var lines = data.split('\n');
    var daat2 = fs.readFileSync(imgData, 'utf8');
    var lines2 = daat2.split('\n');
    if (lines.length != lines2.length){}
    else
    {
        console.log("First rotation is complete! Starting next rotation...");
        fs.writeFile(uidList, '', (err) => {
            if (err) throw err;
        });
    }
}

function coordsCheck(uid)
{
    var data = fs.readFileSync(imgData, 'utf8');
    var lines = data.split('\n');
    for(var i = 0; i < lines.length; i++)
    {
        var args = lines[i].split(' ');
        if(args[5] == uid)
        {
            return [args[0],args[1],args[2]];
        }
    }
    for(var i = 0; i < lines.length; i++)
    {
        var args = lines[i].split(' ');
        if(args.length == 4)
        {
            lines[i] = lines[i] + ' ' + uid;
            var output = lines.join('\n');
            fs.writeFile(imgData, '', (err) => {});
            fs.appendFileSync(imgData, output, 'utf8');
            return [args[0],args[1],args[2]];
        }
    }
}

function createLink(x,y)
{
    var l = `https://www.reddit.com/r/place/?cx=${x}&cy=${y}&px=30`;
    return l;
}

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
        uidCheck(interaction.user.id);
        var coords = coordsCheck(interaction.user.id);
        var link = createLink(coords[0],coords[1]);
        await interaction.reply('Coordinates link: ' + link + '\n' + 'Your color is: ' + coords[2]);
    }
});

client.login(process.env.BOT_TOKEN);