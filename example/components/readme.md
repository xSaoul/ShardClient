# Component Examples

In this guide, we present various options for creating components using the ShardClient library, offering flexibility and enhanced functionality for organizing and formatting your components.

## Files

- **[button.js](./button.js)**: Demonstrates how to create a button component.

Both button and menu files can be created and executed using the example structure.

> _**Note:**_ Menu includes ChannelSelectMenu, MentionbleSelectMenu, RoleSelectMenu, StringSelectMenu, and UserSelectMenu

## Usage

### Importing

```javascript
const {ComponentBuilder} = require('shardclient');
```

### Building

```javascript
module.exports = new ComponentBuilder();
```

### Attaching Data

When making a component, you can attach extra variables to the component using its customId. This will then be destructured automatically for you during the interaction.

```javascript
.setCustomId('customId~${var1}~${var2}~${var3}')
```

## Context

The ShardClient library automatically generates a "context" object as a parameter when invoking commands. You can destructure this object for easier access or use it as a regular object.

### Included Properties

- `ctx.Discord`: discord.js package import
- `ctx.client`: Discord client
- `ctx.interaction`: Interaction object
- `ctx.channel`: Interaction's channel
- `ctx.user`: Interaction's user
- `ctx.member`: Interaction's member
- `ctx.guild`: Interaction's guild
- `ctx.data`: Any variable you'd like to pass to the component (optional)
- `ctx.data2`: Another variable you'd like to pass to the component (optional)
- `ctx.data3`: Yet another variable you'd like to pass to the component (optional)

### Destructuring

You can, optionally, destructure the context object as shown below:

```javascript
const { Discord, client, interaction, channel, user, member, guild, data, data2, data3 } = ctx;
```

This allows you to perform actions like `interaction.reply()` directly, without referencing `ctx.interaction.reply`.