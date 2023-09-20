# Component Examples

We've provided several different options for creating components in a way that you will enjoy. The built in component handler and events are extremely flexible in the way you can organize and format your components.

## Files

- button.js shows you how to create a button.

Both button and menu files can be created and executed with the example structure. 
```
> ℹ️ Menu includes ChannelSelectMenu, MentionbleSelectMenu, RoleSelectMenu, StringSelectMenu, and UserSelectMenu
```

## Usage

**Importing**
const {ComponentBuilder} = require('shardclient')

**Building**
module.exports  =  new  ComponentBuilder()

### Context
The bot automatically creates a "context" object as a parameter when calling components. This can then be either destructured or used as a normal object.

**What's included?**
ctx.Discord - discord.js, you can skip `const Discord = require('discord');`
ctx.client - client
ctx.interaction - interaction
ctx.channel - interaction.channel
ctx.user - interaction.member.user
ctx.member - interaction.member
ctx.guild - interaction.guild
ctx.data - any variable you would like to pass to the component (can be excluded)
ctx.data2 - any variable you would like to pass to the component (can be excluded)
ctx.data3 - any variable you would like to pass to the component (can be excluded)

**Desctructuring**
You can destructure the object as follows
`const {Discord, client, interaction, channel, user, member, guild, data, data2, data3} = ctx`
This lets you do things like `interaction.reply()` rather than `ctx.interaction.reply`