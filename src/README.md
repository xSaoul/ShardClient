
# ShardClient - Custom Discord.js Client Package

Welcome to ShardClient, a powerful extension for Discord.js that enhances your bot development experience. This package provides a feature-rich custom client with extra utilities, methods, and streamlined structures for commands, events, components, and interaction context.

## Features

### Commands
- **Category & Help Display**: Organize commands into categories and display helpful information.
- **Command ID Handling**: Automatically attaches the Discord commandId and file path to each command object for later reference.
- **Main & Subcommands**: Easily define main commands and subcommands for later use.
- **Modularization**: Split commands and subcommands into separate files for better organization.
- **Native**: Pre-built reload command to test changes on the fly without interrupting your bot usage. This can be disabled during client creating.

```javascript
const { ShardClient, ClientOptions } = require('shardclient')
const bot = new ShardClient(
  new ClientOptions(
    .setNativeReloadCommand(false)
    ))
bot.login();
```

> **[Command Documentation](./example/commands/readme.md)**

### Events
- **Custom Events**: Custom events for each interaction type for greater control over your bot.
- **Flexible Event Naming**: Optional event naming for your convenience.
- **Native**: Commands, components, and modals are already handled for you! If you'd like to use your own events, you can disable ours during client creation.

```javascript
const { ShardClient, ClientOptions } = require('shardclient')
const bot = new ShardClient(
  new ClientOptions(
  .setNativeCommandEvent(false)
  .setNativeComponentEvent(false)
  .setNativeModalEvent(false)
  ))
bot.login();
```
> **[Event Documentation](./example/events/readme.md)**

### Components
- **Component Interactions**: Move message component interactions into separate files for organization.
- **Optional Naming**: Name your interactions as you see fit.

> **[Component Documentation](./example/components/readme.md)**

### Context
- **Command & Interaction Context**: Creates a command and interaction context object for easy access to all parameters.
- **Destructuring Support**: Combines all parameters into one `ctx` variable for simpler code.

### Automatic Handling
- **Effortless Setup**: All handlers are built into the package, making setup a breeze.
- **Dynamic File Sweeping**: Automatically scans and processes all necessary files within your directory structure.

## Installation

To install ShardClient using npm:

```bash
npm install shardclient
```
## Usage

Here's a basic example of how to set up your custom Discord.js client using ShardClient:

```javascript
const { ShardClient, ClientOptions } = require('shardclient')
const bot = new ShardClient(new ClientOptions())
bot.login();
```
For detailed usage and examples, please refer to the [example](./example/) folder.

## Contributing

Contributions to this project are welcome! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

ShardClient is licensed under the [MIT License](./LICENSE).

## Acknowledgements

Special thanks to the [Discord.js](https://discord.js.org/) community for their amazing work and inspiration.

## Support

Unfortunately we do not have any direct support lines open. In the future, we will have a Discord server ready to help whenever its needed!