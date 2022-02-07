"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var commands_1 = require("./commands");
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
var slashCommands = (0, commands_1.loadSlashCommands)(client);
client.on('interactionCreate', function (interaction) {
    if (!interaction.isCommand())
        return;
    var run = slashCommands.get(interaction.commandName);
    if (!run) {
        interaction.reply('Unknown command');
        return;
    }
    run(interaction, interaction.commandName);
});
client.on('ready', function () {
    console.log("Logged in as ".concat(client.user.tag, ". Ready to serve ").concat(client.users.cache.size, " users in ").concat(client.guilds.cache.size, " servers \uD83D\uDE80"));
});
// setInterval(async () => {
//     const channel = await client.channels.fetch('929521756299993088')
//     // const platform = 'PC'
//     // const username = ''
//     // const request = new Request(`http://127.0.0.1:8888/player?uid=1007404618881&platform=PC`)
//     if (channel != null && channel.isText()) {
//         const players = ['PotagerDeNavets']
//         const embeds = []
//         for (let player of players) {
//             embeds.push(new MessageEmbed()
//                 .setThumbnail('https://cdn.discordapp.com/avatars/834216621152403457/8c3f25fead893348950aabcaf66d8707.png')
//                 .setTitle(player)
//                 .setFields([{ name: ':green_circle: PotagerDeNavets', value: 'Pathfinder\nLVL 550\non World Edges', inline: true },
//                 { name: 'PotagerDeNavets', value: 'Pathfinder\nLVL 550\non World Edges', inline: true },
//                 ])
//                 .setColor(8722986)
//             )
//         }
//         channel.send({ "embeds": embeds })
//     }
// }, 3000)
client.login(process.env.DISCORD_CLIENT_TOKEN);
//# sourceMappingURL=index.js.map