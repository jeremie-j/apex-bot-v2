import { CommandInteraction } from "discord.js";
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
    interaction.reply({ content: JSON.stringify(result.account) })
  } catch (e) {
    console.log(e)
  }
}