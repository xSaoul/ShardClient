const { ComponentBuilder } = require('shardclient');
module.exports = new ComponentBuilder().setCustomId('ExampleButton').setCallback(ctx => {
  ctx.interaction.reply({ content: 'ExampleButton Pressed', ephemeral: true });
});
