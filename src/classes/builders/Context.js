/**
 * Represents the context for a command interaction.
 */
class CommandContext {
  /**
   * Creates a new CommandContext.
   * @param {Object} interaction - The interaction object from Discord.js.
   * @param {Object} client - The Discord bot client.
   */
  constructor(interaction, client) {
    this.Discord = client.Discord;
    this.client = client;
    this.interaction = interaction;
    this.channel = interaction.channel;
    this.user = interaction.member.user;
    this.member = interaction.member;
    this.guild = interaction.guild;
    this.message = interaction.message;
  }
}

class ComponentContext extends CommandContext {
  constructor(interaction, client, data, data2, data3) {
    super(interaction, client);
    this.data = data;
    this.data2 = data2;
    this.data3 = data3;
  }
}

module.exports = { CommandContext, ComponentContext };
