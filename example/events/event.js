const { EventBuilder } = require('shardclient');
module.exports = new EventBuilder()
  .setName('ReadyMain')
  .setTrigger('ready')
  .setOnce(true)
  .setCallback(() => {
    console.log('Bot is ready!');
  });
