const dotenv = require('dotenv');
dotenv.config();

const { img } = require('./config.json');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready!');
});

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1000, 1000)
const ctx = canvas.getContext('2d')

loadImage(img).then(image => {
    ctx.drawImage(image, 0, 0)
    //console.log(canvas.toDataURL())
    console.log(ctx.getImageData(9,0,image.width,image.height).data[0])
    console.log(ctx.getImageData(9,0,image.width,image.height).data[1])
    console.log(ctx.getImageData(9,0,image.width,image.height).data[2])
    console.log(ctx.getImageData(9,0,image.width,image.height).data[3])
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;
    
	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.login(process.env.BOT_TOKEN);