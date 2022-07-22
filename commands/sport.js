const Discord = require('discord.js');
const MySqlConnector = require('../src/MySqlConnector');


/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async(client, message, arguments) => {
    let sportName = arguments
    let sport = await MySqlConnector.executeQuery(`SELECT * FROM sports WHERE Sport_Name="${sportName}"`);

    let sportifsDb = await MySqlConnector.executeQuery(`SELECT * FROM sportifs id WHERE id = "${sport[0].id_Sportif_top1}" OR id = "${sport[0].id_Sportif_top2}" OR id = "${sport[0].id_Sportif_top3}"`);
    console.log(sportifsDb)

    const embed = new Discord.MessageEmbed();
    embed.setTitle(`Sport: ${sportName}`)
        .setDescription(`Meilleurs athlètes: \n - 1: ${sportifsDb[0].Nom} ${sportifsDb[0].Prénom} - ${sportifsDb[0].Pays}
         \n - 2: ${sportifsDb[1].Nom} ${sportifsDb[1].Prénom} - ${sportifsDb[1].Pays}
         \n - 3: ${sportifsDb[2].Nom} ${sportifsDb[2].Prénom} - ${sportifsDb[2].Pays}`)
        .setColor('RED')
    await message.channel.send({
        embeds: [embed]
    });

};

module.exports.name = 'sport'