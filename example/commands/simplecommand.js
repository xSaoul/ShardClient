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
    // Command code
  });
