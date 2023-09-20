const { CommandBuilder } = require('shardclient');
// import the subcommand files
const subcommandfile = require('./subcommand');
const subcommandfile2 = require('./subcommand2');
module.exports = new CommandBuilder()
  .setName('maincommand')
  .setDescription('command description')
  .setCategory('maincommand category')
  .addSubcommand(subcommandfile) // Set the subcommand to the subcommand import
  .addSubcommand(subcommandfile2) // Set the subcommand to the subcommand2 import
  .setCallback(async ctx => {
    // Determine whether the interaction is autocomplete or callback
    const method = ctx.interaction.isAutocomplete() ? 'autocallback' : 'callback';
    // Get the subcommand name from the interaction's options
    const subcommand = ctx.interaction.options.getSubcommand();
    // Use a switch statement to handle multiple subcommands
    switch (subcommand) {
      case 'subcommand':
        // Execute the subcommand with the appropriate method
        await subcommandfile[method](ctx);
        break;
      case 'subcommand2':
        // Execute the subcommand with the appropriate method
        await subcommandfile2[method](ctx);
        break;
    }
  });
