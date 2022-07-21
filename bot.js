require('dotenv').config()
const Discord = require('discord.js');
const token = 'OTk5NzQ1ODU0NzE2MDA2NDUx.G9IRJP.H76XKCW70X-k8xMuwZ2Ck82uTUvDNtd6GKKL18';
// const commandLoader = require('./commandLoader');
// const MySqlConnector = require('./src/MySqlConnector');
const { bdd } = require('./Commands/ApiDB');
const bot = new Discord.Client({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

bot.on('messageCreate', async(message) => {
    if (!message.author.bot) {
        if (message.content === 'ping') {
            bdd.getClassement('Natation 100M', async(classement) => { console.log(classement) })
            const channel = message.channel;
            await channel.send('Pong!');

            await message.reply('Pong!')

        }

    }

});

bot.login(process.env.TOKEN)
    .then(() =>
        console.log('connexion ok')
    ).catch(error => {
        console.error(error);
    })