# Example

The example folder can serve as a guide of how to use the bot. Each folder contains another readme file with a more in depth explanation of how each component works using ShardClient.

## Files

- **[index.js](./index.js)**: Demonstrates how to create a main file.

> _**Note:**_ index.js can be named anything you want as long as it matches your package.json, like normal with Node.js

## Usage

### Importing

```javascript
const { ShardClient, ClientOptions } = require('shardclient')
const { Partials, GatewayIntentBits } = require('discord.js');
```

### Building

The bot object can be used to login, and start the processing of all commands, events, and components. The login function also overrides and takes the responsibilities of the default discord.js login function.

```javascript
const bot = new ShardClient()
```

### Logging in

The bot object can be used to login, and start the processing of all commands, events, and components. The login function also overrides and takes the responsibilities of the default discord.js login function.

```javascript
.login(
  new ClientOptions()
  .setToken('example-token')
  .setProcessPath('./example-path')
  .setGuildCommandsId('example-guildId')
  .setNativeCommandEvent(false)
  .setNativeComponentEvent(false)
  .setNativeModalEvent(false)
);
```

As previously stated, the .login function serves the same purpose as the one you're used to in discord.js. This means you can use all the same chained functions and properties. However, ShardClient adds some useful ones shown above and explained below.

## Login Properties

ShardClient adds some useful properties to help start and maintain your bot. Here, they are listed and explained in more detail. All properties are optional and have built in defaults.

> _**Note:**_ Intents and Partials will default to all, this should only be used for development phases.

### Included Properties

- `.setToken(String)`: Discord token used for login. This can be left out only if there is a .env file containg `TOKEN = String`
- `.setProcessPath(String)`: This property allows you to set where you want the processing of files to start. If left blank, the client will start where the process does, or the same file as your main/index
- `.setGuildCommandsId(String)`: Not ready to push your commands globally? This property allows you to specify which guild to register commands to.
- `.setNativeCommandEvent(Boolean)`: If you'd like to handle command interactions on your own, you can supress the built in function for commands.
- `.setNativeComponentEvent(Boolean)`: If you'd like to handle component interactions on your own, you can supress the built in function for commands.
- `.setNativeModalEvent(Boolean)`: Unfortunately, ShardClient doesn't currently handle Modals for you. Still, it provides a custom function that can be supressed or used.