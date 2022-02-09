import { CommandInteraction,MessageEmbed } from "discord.js";
import request from '../utils/requests'


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
  const platform = interaction.options.get('plateform')

  try {
    const result = await request("player", "GET", null, { origin_id: originId, platform: platform })
    if (result){
      const field = []
      const legend = result.legends.selected
      for (const tracker of legend.trackers){
        let trackerName = tracker.name.split('_')
        trackerName=trackerName.join(' ')
        trackerName = trackerName.charAt(0).toUpperCase() +  trackerName.slice(1)
        console.log(tracker)
        field.push({name: trackerName, value:  `${tracker.value}`, inline: true})
      }
      const embed = new MessageEmbed()
          .setColor('#851a2a')
          .setTitle(`${result.account.username}'s statistics`)
          .setDescription(`LVL **${result.account.level}**\nRank **${result.account.rank.rank_score} RP**\n\nPlaying **${legend.name}**`)
          .setFields(field)
          .setFooter({text:`Player ${result.session.online ? 'online' : 'offline'} - Created by Nave`})
          interaction.reply({embeds:[embed]})
    }else{
      interaction.reply({ content: 'hmm, something went wrong' })
    }
    
  } catch (e) {
    console.log(e)
  }
}