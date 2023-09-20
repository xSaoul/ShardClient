const { EventBuilder, Events } = require('../classes/builders/Events');
const { CommandContext } = require('../classes/builders/Context');
module.exports = new EventBuilder()
  .setName('CommandInteraction')
  .setTrigger(Events.CommandEvent)
  .setOnce(false)
  .setCallback(async (client, interaction) => {
    const cmd = await client.commands.get(interaction.commandName);
    if (!cmd) {
      interaction.reply({ content: "Sorry, I couldn't find that command. Please use /help to see the available commands.", ephemeral: true });
      return;
    }
    const context = new CommandContext(interaction, client);
    const method = interaction.isAutocomplete() ? 'autocallback' : 'callback';
    try {
      if (!interaction.options._subcommand) {
        await cmd[method](context);
      } else {
        await cmd.callback(context);
      }
    } catch (error) {
      if (interaction.isAutocomplete()) return;
      console.log(error);
      const replyMethod = interaction.replied || interaction.deferred ? 'editReply' : 'reply';
      interaction[replyMethod]({
        content: "Oops, something went wrong! Our team has been notified, and we'll work on fixing it. Please try again later.",
        ephemeral: true,
      });
    }
  });
