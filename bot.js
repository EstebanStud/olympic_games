require('dotenv').config()
const Discord = require('discord.js');
const commandLoader = require('./commandLoader');
const MySqlConnector = require('./src/MySqlConnector');
// const { bdd } = require('./Commands/ApiDB');
const bot = new Discord.Client({
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
});

MySqlConnector.connect();
commandLoader.load(bot);


bot.on('messageCreate', async(message) => {


    if (message.content.startsWith("!")) {
        let words = message.content.split(' ');
        const commandName = words.shift().slice(1);
        const arguments = words;

        if (bot.commands.has(commandName)) {
            // La commande existe, on la lance
            bot.commands.get(commandName).run(bot, message, arguments);
        } else {
            // La commande n'existe pas, on prÃ©vient l'utilisateur
            await message.delete();
            await message.channel.send(`The ${commandName} command does not exist.`);
        }

    }

});

bot.login(process.env.TOKEN)
    .then(() =>
        console.log('connexion ok')
    ).catch(error => {
        console.error(error);
    })