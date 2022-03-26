import { CommandInteraction, MessageEmbed } from "discord.js";
import request from '../utils/requests'
import { badges } from '../utils/emotes'
import { legendsList } from '../utils/legends'
import { capitalize } from '../utils/string'
import PlayerType from '../types/playerData'
const { SlashCommandBuilder } = require('@discordjs/builders');

export const commands = [
    {
        ...new SlashCommandBuilder()
            .setName('statistics')
            .setDescription('Get statistics of a player')
            .addStringOption(option =>
                option.setName('username')
                    .setDescription('A unique Origin ID')
                    .setRequired(true)
            )
            .addStringOption((option) => {
                option.setName('legend')
                    .setDescription('Legend name for stats')
                    .setRequired(false)
                legendsList.map(legend_name => { option.addChoice(capitalize(legend_name), legend_name) })
                return option
            }
            )
            .addStringOption(option =>
                option.setName('plateform')
                    .setDescription('The platform of the player (Default PC)')
                    .addChoice('PC', 'PC')
                    .addChoice('PS4', 'PS4')
                    .addChoice('X1', 'X1')
                    .setRequired(false)
            )
    }
];

export const run = async (interaction: CommandInteraction) => {
    const originId = interaction.options.getString('username')
    const selectedLegend = interaction.options.getString('legend')
    const platform = interaction.options.get('plateform')
    try {
        const result: PlayerType | null = await request("player", "GET", null, { origin_id: originId, platform: platform })
        if (result) {
            const field = []

            let legend
            if (selectedLegend) {
                legend = result.legends.all[selectedLegend]
                if (legend === undefined) {
                    interaction.reply({ content: 'No stats found for this player with ' + selectedLegend + ' legend' })
                }
            } else {
                legend = result.legends.selected
            }

            const specials_trackers = ["specialEvent_kills", "specialEvent_wins", "specialEvent_damage"]
            for (const tracker of legend.trackers) {
                let trackerName
                if (specials_trackers.includes(tracker.name)) {
                    trackerName = capitalize(tracker.name.split('_').at(-1))
                } else {
                    trackerName = capitalize(tracker.name.split('_').join(' '))
                }
                field.push({ name: trackerName, value: `${tracker.value}`, inline: true })
            }
            const username = result.account.username
            const accountLevel = result.account.level
            const rankdBadge = badges[result.account.rank.rank_name]
            const rankName = capitalize(result.account.rank.rank_name) + ' ' + result.account.rank.rank_division
            const rankScore = result.account.rank.rank_score
            const legendName = capitalize(legend.name)


            const embed = new MessageEmbed()
                .setColor('#851a2a')
                .setTitle(`${username}'s statistics`)
                .setDescription(
                    `${badges.level} **LVL ${accountLevel}**\n` +
                    `${rankdBadge} **${rankName}** (${rankScore} RP)\n` +
                    `Currently playing **${capitalize(result.legends.selected.name)}**\n\n` +
                    `__**${legendName} Statistics:**__`
                )
                .setFields(field)
                .setImage(`https://cdn.apex-bot.defou.fr//banners/${legend.name}.jpeg`)
                .setFooter({ text: `Player ${result.session.online ? 'online' : 'offline'} - Created by PotagerDeNavets` })
            interaction.reply({ embeds: [embed] })
        } else {
            interaction.reply({ content: 'hmm, something went wrong' })
        }

    } catch (e) {
        console.log(e)
    }
}