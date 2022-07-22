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

    // le Point d'exclamation permet au bot de reconnaitre que c'est le début d'une commande
    if (message.content.startsWith("!")) {
        let words = message.content.split(' '); // Je récupère les différents mots présents dans la commande // words recupère les différents mots de la commande
        const commandName = words.shift().slice(1); // command recupère le nom de la commande
        const arguments = words; // Arguments récupère les arguments après la commande

        if (bot.commands.has(commandName)) {
            // La commande existe, on la lance
            bot.commands.get(commandName).run(bot, message, arguments);
        } else {
            // La commande n'existe pas, on prévient l'utilisateur
            await message.delete();
            await message.channel.send(`The ${commandName} command does not exist.`);
        }

    }

});

// permet de vérifier si la connexion avec le token discord est bien effectué

bot.login(process.env.TOKEN)
    .then(() =>
        console.log('connexion ok')
    ).catch(error => {
        console.error(error);
    })