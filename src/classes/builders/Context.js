class CommandContext {
  constructor(interaction, client) {
    this.Discord = client.Discord;
    this.client = client;
    this.interaction = interaction;
    this.channel = interaction.channel;
    this.user = interaction.member.user;
    this.member = interaction.member;
    this.guild = interaction.guild;
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
