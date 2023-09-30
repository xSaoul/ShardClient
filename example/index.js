const { ShardClient, ClientOptions } = require('shardclient')
const { Partials, GatewayIntentBits } = require('discord.js');
const bot = new ShardClient()
bot.login(
  new ClientOptions()
  .setPartials([
    Partials.Message, 
    Partials.Channel, 
    Partials.Reaction
  ])
  .setIntents(
    GatewayIntentBits.Guilds,
  )
  .setToken('example-token') // optional, defaults to environment variable TOKEN
  .setProcessPath('./example-path') // optional, defaults to process root
  .setGuildCommandsId('example-guildId') // optional, defaults to global commands
  .setNativeCommandEvent(false) // optional, enables/disables the built in command event, defaults to false
  .setNativeComponentEvent(false) // optional, enables/disables the built in component event, defaults to false
  .setNativeModalEvent(false) // optional, enables/disables the built in modal event, defaults to false (NOT YET IMPLIMENTED)
);