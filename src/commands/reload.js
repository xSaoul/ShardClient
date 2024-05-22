const { CommandBuilder } = require('../classes/builders/Commands');
const path = require('path');
module.exports = new CommandBuilder()
  .setName('reload')
  .setDescription('Reload a command to impliment any changes without restarting the bot.')
  .setCategory('Development')
  .addStringOption(option => option.setName('command').setDescription('Command you would like to reload').setAutocomplete(true).setRequired(true))
  .setAutoCallback(async ctx => {
    const selectedCommand = ctx.interaction.options.getFocused();
    const filteredCommands = ctx.client.commands.filter(choice => choice.name.startsWith(selectedCommand));
    await ctx.interaction.respond(filteredCommands.map(choice => ({ name: choice.name, value: choice.name })));
  })
  .setCallback(ctx => {
    if (!ctx.client.developers.includes(ctx.member.id))
      return ctx.interaction.reply({ content: "I'm sorry, this command is for developers only!", ephemeral: true });
    const commandName = ctx.interaction.options.getString('command');
    const command = ctx.client.commands.get(commandName);
    const resolvedPath = require.resolve(path.join(process.cwd(), command.path));
    delete require.cache[resolvedPath];
    const newCommand = require(resolvedPath);
    Object.assign(command, newCommand);
    ctx.client.commands.set(commandName, command);
    ctx.interaction.reply({ content: `Successfully reloaded command: ${commandName}`, ephemeral: true });
  });
