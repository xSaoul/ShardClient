const { EventBuilder, Events } = require('shardclient');
module.exports = new EventBuilder()
  .setName('ReadyMain')
  .setTrigger(Events.ClientReady)
  .setOnce(true)
  .setCallback((client) => {
    console.log('Bot is ready!');
  });
