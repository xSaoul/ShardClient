const { SubcommandBuilder } = require('shardclient');
module.exports = new SubcommandBuilder()
  .setName('subcommand2')
  .setMainCommand('maincommand') // Set to the main commands name
  .setHelp(true) // Whether or not the subcommand should be displayed in the help menu
  .setDescription('subcommand2 description')
  .addStringOption(option => option.setName('string').setDescription('string description').setAutocomplete(true))
  .addChannelOption(option => option.setName('channel').setDescription('channel description'))
  .addUserOption(option => option.setName('user').setDescription('user description'))
  .setAutoCallback(ctx => {
    // Autocomplete code
  })
  .setCallback(ctx => {
    // Subcommand code
  });
