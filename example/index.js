const { ShardClient, ClientOptions } = require('shardclient')
const { Partials, GatewayIntentBits } = require('discord.js');
const bot = new ShardClient(
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
  .setDevelopers(['developerId', 'developerId']) // options, list of developers to be used in /reload command or elsewhere (can be array or string)
  .setGuildCommandsId('example-guildId') // optional, defaults to global commands
  .setNativeCommandEvent(false) // optional, enables/disables the built in command event, defaults to true
  .setNativeComponentEvent(false) // optional, enables/disables the built in component event, defaults to true
  .setNativeModalEvent(false) // optional, enables/disables the built in modal event, defaults to false (NOT YET IMPLIMENTED)
  .setNativeReloadCommand(false) // optional, enables/disables the built in reload command, defaults to true
)
bot.login();