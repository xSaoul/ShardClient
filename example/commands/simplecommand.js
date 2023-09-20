const { CommandBuilder } = require('shardclient');
module.exports = new CommandBuilder()
  .setName('command')
  .setDescription('description')
  .setHelp(true) // Whether or not the command should be displayed in the help menu
  .setCategory('category')
  .addStringOption(option => option.setName('string').setDescription('string description').setAutocomplete(true))
  .setAutoCallback(async ctx => {
    // Autocomplete code
  })
  .setCallback(ctx => {
    const data = 1;
    const data2 = 2;
    const data3 = 3;
    const ExampleRow = new ctx.Discord.ActionRowBuilder().addComponents(
      new ctx.Discord.ButtonBuilder()
        .setCustomId(`ExampleButton~${data}~${data2}~${data3}`)
        .setLabel('Example')
        .setStyle(ctx.Discord.ButtonStyle.Success)
    )
  });
