# Command Examples

We've provided several different options for creating commands in a way that you will enjoy. The built in command handler and events are extremely flexible in the way you can organize and format your commands. They also import all discord.js methods so that you can keep writing commands they way you're used to with extra functionality provided by us. 


## Files

- simplecommand.js shows you how to create a command with no subcommands plus a simple button example.
- simplesubcommand folder will show you how to create a command with subcommmands the "normal" way.
- advancedsubcommand folder will show you how to create a command with subcommands that are created and run from other files. This provides an extra layer of organization to your file structure.

## Usage
ShardClient has added two extremely useful classes for you to use that extend the discord.js native ones. These are the *CommandBuilder* and the *SubcommandBuilder*. Both classes include custom methods with advanced functionality like categories. They also have jsdoc included, so intellisense in VScode can help make the development process that much easier.

**Importing**
const {CommandBuilder} = require('shardclient')
const {SubcommandBuilder} = require('shardclient')

**Building**
module.exports  =  new  CommandBuilder()
module.exports  =  new  SubcommandBuilder()

### Context
The bot automatically creates a "context" object as a parameter when calling commands. This can then be either destructured or used as a normal object.

**What's included?**
ctx.Discord - discord.js, you can skip `const Discord = require('discord');`
ctx.client - client
ctx.interaction - interaction
ctx.channel - interaction.channel
ctx.user - interaction.member.user
ctx.member - interaction.member
ctx.guild - interaction.guild

**Desctructuring**
You can destructure the object as follows
`const {Discord, client, interaction, channel, user, member, guild} = ctx`
This lets you do things like `interaction.reply()` rather than `ctx.interaction.reply`