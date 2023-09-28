const { ShardClient } = require('shardclient')
const bot = new ShardClient()
/* 
Optional client options:
token - Token used for login (Will default to environment variable TOKEN)
processPath - Path to start the directory sweep from (Will default to process root)
guildCommandsId - Id of the guild for commands (will default to global commands)
*/
bot.login({});