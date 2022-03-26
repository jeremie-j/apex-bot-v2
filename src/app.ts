import { config } from 'dotenv';
config();

import { loadSlashCommands } from './commands';

import { Client, DiscordAPIError, Intents, MessageEmbed } from 'discord.js';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const slashCommands = loadSlashCommands(client);

client.on('interactionCreate', (interaction) => {

    if (!interaction.isCommand()) return;
    const run = slashCommands.get(interaction.commandName);

    if (!run) {
        interaction.reply('Unknown command');
        return;
    }

    run(interaction, interaction.commandName);

});



client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}. Ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers 🚀`);
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
client.login(process.env.DISCORD_CLIENT_TOKEN)