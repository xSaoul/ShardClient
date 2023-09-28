const { EventBuilder, Events } = require('../classes/builders/Events');
const { ComponentContext } = require('../classes/builders/Context');
module.exports = new EventBuilder()
  .setName('componentInteraction')
  .setTrigger(Events.ComponentEvent)
  .setOnce(false)
  .setCallback(async (client, interaction) => {
    const [customId, data, data2, data3] = interaction.customId.split('~');
    const component = client.components.get(customId);

    if (!component)
      return interaction.reply({
        content: 'Sorry, the required message component was not found. Please try again or contact support if the issue persists.',
        ephemeral: true,
      });

    const context = new ComponentContext(interaction, client, data, data2, data3);

    try {
      await component.callback(context);
    } catch (error) {
      console.log(error);
      const replyMethod = interaction.replied || interaction.deferred ? 'editReply' : 'reply';
      interaction[replyMethod]({
        content:
          "Oops, something went wrong with the message component. Our team has been notified, and we'll work on fixing it. Please try again later.",
        ephemeral: true,
      });
    }
  });
