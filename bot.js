require('dotenv').config()
const Discord = require('discord.js');

// const commandLoader = require('./commandLoader');
const MySqlConnector = require('./src/MySqlConnector');
// const { bdd } = require('./Commands/ApiDB');
const bot = new Discord.Client({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

MySqlConnector.connect();

bot.on('messageCreate', async(message) => {
    let sportName = "Natation 100M";
    let classement = await MySqlConnector.executeQuery(`SELECT * FROM sports WHERE Sport_Name="${sportName}"`);

    if (!message.author.bot) {
        if (message.content === 'ping') {
            console.log(classement)
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