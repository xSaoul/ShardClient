const { CommandBuilder } = require('shardclient');
module.exports = new CommandBuilder()
  .setName('maincommand')
  .setDescription('command description')
  .setCategory('maincommand category')
  .addSubcommand(subcommand =>
    subcommand
      .setName('subcommand')
      .setDescription('subcommand description')
      .addStringOption(option => option.setName('string').setDescription('string description').setAutocomplete(true))
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('subcommand2')
      .setDescription('subcommand2 description')
      .addStringOption(option => option.setName('string').setDescription('string description').setAutocomplete(true))
  )
  .setCallback(async ctx => {
    // Get the subcommand name from the interaction's options
    const subcommand = ctx.interaction.options.getSubcommand();
    // Use a switch statement to handle multiple subcommands
    switch (subcommand) {
      case 'subcommand':
        // subcommand code
        break;
      case 'subcommand2':
        // subcommand2 code
        break;
    }
  });
