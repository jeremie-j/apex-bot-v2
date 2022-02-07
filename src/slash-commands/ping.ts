import { CommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require('@discordjs/builders');


export const commands = [
  {
    ...new SlashCommandBuilder()
      .setName('pong')
      .setDescription('Get the bot latency')
  }
];

export const run = async (interaction: CommandInteraction) => {
  interaction.reply(`Pong! My latency is currently \`${interaction.client.ws.ping}ms\`.`)
}