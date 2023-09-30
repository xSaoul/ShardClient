# Command Examples

In this guide, we offer various options for creating commands using the ShardClient library, providing flexibility and extra functionality while allowing you to maintain your familiar discord.js command writing style. We've organized these examples for your convenience.

## Files

1. **[simplecommand.js](./simplecommand.js)**: Demonstrates how to create a command with no subcommands, along with a simple button example.
2. **[simplesubcommand folder](./simplesubcommand/)**: Guides you on creating a command with subcommands using the "normal" approach.
3. **[advancedsubcommand folder](./advancedsubcommand/)**: Shows how to create subcommands in separate files, adding an additional layer of organization to your file structure.

## Usage

ShardClient introduces two essential classes that extend the capabilities of discord.js: *CommandBuilder* and *SubcommandBuilder*. These classes provide advanced functionality and come with integrated JSDoc support for an improved development experience in VSCode.

### Functionality

- Category {String}
- Help {Boolean} Can be useful when developing a help command.
- id {String} Automatically attaches the commandId to the builder object for later use

## Importing

```javascript
const { CommandBuilder } = require('shardclient');
const { SubcommandBuilder } = require('shardclient');
```

### Building

```javascript
module.exports = new CommandBuilder();
module.exports = new SubcommandBuilder();
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

### Destructuring

You can, optionally, destructure the context object as shown below:

```javascript
const { Discord, client, interaction, channel, user, member, guild } = ctx;
```
This allows you to perform actions like `interaction.reply()` directly, without referencing `ctx.interaction.reply`.