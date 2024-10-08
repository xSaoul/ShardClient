const { Client, Collection } = require('discord.js');
const { ClientOptions } = require('./util/ClientOptions');
const { Events } = require('./builders/Events');
const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Table = require('cli-table');

// processApp() exclusions
const commonExclusions = [
  'node_modules',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  '.npm',
  '.env',
  '.env.local',
  '.git',
  '.gitignore',
  '.eslintignore',
  '.prettierignore',
  '.eslintrc.js',
  '.eslintrc.json',
  '.prettierrc.js',
  '.prettierrc.json',
];

/** Class representing the bot with discord.js client attached.
 * @extends Client imports methods and values from discord.js client
 */
class ShardClient extends Client {
  /**
   * Creates the client and imports environment variables.
   * @param {{partials: Array, intents: Array}} options Object containing client intents and partials used for login
   * @description In the case no partials or intents are provided, the bot will default to all. This should only be used for testing.
   * @tutorial https://discordjs.guide/popular-topics/intents.html#privileged-intents gateway intents tutorial from Discord.js Guide
   * @tutorial https://discordjs.guide/popular-topics/partials.html#enabling-partials partial strutcures tutorial form Discord.js Guide
   */
  constructor(options = {}) {
    const clientOptions = options instanceof ClientOptions ? options.getOptions() : options;
    const mergedOptions = {
      ...clientOptions,
      ...options,
    };

    super(mergedOptions);

    this.token = mergedOptions.token || process.env.TOKEN;
    this.developers = mergedOptions.developers;
    this.processPath = mergedOptions.processPath;
    this.guildCommandsId = mergedOptions.guildCommandsId;
    this.nativeCommandEvent = mergedOptions.nativeCommandEvent;
    this.nativeComponentEvent = mergedOptions.nativeComponentEvent;
    this.nativeModalEvent = mergedOptions.nativeModalEvent;
    this.nativeReloadCommand = mergedOptions.nativeReloadCommand;

    this.usedTypes = new Set();
    this.Discord = Discord;
    this.tableChars = {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      mid: '─',
      'mid-mid': '┼',
      right: '║',
      'right-mid': '╢',
      middle: '│',
    };
  }

  /**
   * Processes main directory and creates collections of commands, events, and components.
   * @param {Client} client discord.js client object
   * @param {string} guildCommandsId - Id of the guild for commands (optional).
   * @param {string} dirPath main directory, defaults to src from working directory
   * @param {string} currentDir current directory being processed
   * @param {boolean} initialCall - Indicates if this is the initial call
   */
  async processApp(client, guildCommandsId, dirPath, currentDir = '', initialCall = true) {
    // register local events first
    if (initialCall) {
      const eventsFolderPath = path.join(__dirname, '..', 'events');
      for (const item of fs.readdirSync(eventsFolderPath)) {
        const itemPath = path.join(eventsFolderPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isFile() && path.extname(item) === '.js') {
          const req = require(itemPath);
          req.path = path.join('native', item);
          if (req._type) {
            if (!client[req._type]) client[req._type] = new Collection();
            client[req._type].set(req.name, req);
            if (!this.usedTypes.has(req._type)) this.usedTypes.add(req._type);
          }
        }
      }
    }
    const resources = fs.readdirSync(dirPath);

    // logging
    currentDir === ''
      ? console.log(`${chalk.hex('#8AFFF9')('STARTED PROCESSING')} for ${client.user.username}`)
      : console.log(`${chalk.hex('#8AFFF9')('ENTERED')} directory: ${currentDir}`);

    for (const item of resources) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (commonExclusions.includes(item)) {
        continue;
      }
      if (stats.isDirectory()) {
        this.processApp(client, guildCommandsId, itemPath, path.join(currentDir, item));
      } else if (stats.isFile() && path.extname(item) === '.js') {
        try {
          const req = require(itemPath);
          if (req.isSubcommand) continue;
          req.path = path.join(currentDir, item);
          if (req.callback?.toString().trim() === '() => {}') req.error = 'Callback Error';
          if (req._type) {
            if (!client[req._type]) client[req._type] = new Collection();
            client[req._type].set(req.name || req.customId || req.trigger, req);
            if (!this.usedTypes.has(req._type)) this.usedTypes.add(req._type);
          }
        } catch (error) {
          console.error(`${chalk.hex('#FF1C1C')('ERROR')} reading JS file: ${path.join(currentDir, item)}`, error);
        }
      }
    }
    if (currentDir !== '') {
      console.log(`${chalk.hex('#8AFFF9')('EXITED')} directory: ${currentDir}`);
    } else {
      console.log(`${chalk.hex('#8AFFF9')('COMPLETED PROCESSING')} for ${client.user.username}`);
      const processCommandsPromise = this.usedTypes.has('commands') ? this.processCommands(client, guildCommandsId) : null;
      const processEventsPromise = this.usedTypes.has('events') ? this.processEvents(client) : null;
      const processComponentsPromise = this.usedTypes.has('components') ? this.processComponents(client) : null;
      await Promise.all([processCommandsPromise, processEventsPromise, processComponentsPromise]);
    }
  }

  /**
   * Asynchronously creates and manages commands for a Discord client.
   *
   * This method iterates through the client's commands, creates them on the Discord application,
   * and logs the success or failure of each command creation in a table.
   *
   * @param {Discord.Client} client - The Discord client to create commands for.
   * @param {string} guildCommandsId - Id of the guild for commands (optional).
   * @returns {Promise<void>} - A promise that resolves when all commands have been processed.
   */
  async processCommands(client, guildCommandsId) {
    const startCommands = Date.now();
    const table = new Table({
      head: [chalk.hex('#00DBFF')('Command Name'), chalk.hex('#00DBFF')('File Path'), chalk.hex('#00DBFF')('Status')],
      colWidths: [30, 50, 10],
      chars: this.tableChars,
    });
    const batchCommands = [];

    if (this.nativeReloadCommand) {
      const reloadCommand = require('../commands/reload');
      reloadCommand.path = 'native\\reload.js';
      client.commands.set(reloadCommand.name, reloadCommand);
    }

    client.commands.forEach(command => {
      if (!command.error) {
        if (command.category?.length > 32) {
          table.push([chalk.hex('#8AFFF9')('Category too long'), chalk.hex('#8AFFF9')(command.path), chalk.hex('#FF1C1C')('Failure')]);
          return;
        }
        batchCommands.push(command.toJSON());
      } else {
        table.push([chalk.hex('#8AFFF9')(command.error), chalk.hex('#8AFFF9')(command.path), chalk.hex('#FF1C1C')('Failure')]);
      }
    });

    try {
      const appCommands = await client.application.commands.set(batchCommands, guildCommandsId);

      client.commands.forEach(command => {
        const createdCommand = appCommands.find(cmd => cmd.name === command.name);
        if (createdCommand) {
          command.id = createdCommand.id;
          table.push([chalk.hex('#8AFFF9')(command.name), chalk.hex('#8AFFF9')(command.path), chalk.hex('#1CFF43')('Success')]);
        } else {
          table.push([chalk.hex('#8AFFF9')('Creation Error'), chalk.hex('#8AFFF9')(command.path), chalk.hex('#FF1C1C')('Failure')]);
        }
      });
    } catch (error) {
      console.error('Failed to create commands:', error);
      table.push([chalk.hex('#8AFFF9')('Batch Creation Error'), chalk.hex('#8AFFF9')('N/A'), chalk.hex('#FF1C1C')('Failure')]);
    }

    const endCommands = Date.now();
    const totalCommandTime = endCommands - startCommands;

    table.push([chalk.hex('#00DBFF')('Total Runtime'), chalk.hex('#00DBFF')('-'), chalk.hex('#00DBFF')(`${totalCommandTime}ms`)]);

    console.log(table.toString());
  }

  /**
   * Process and manage events.
   * @param {Client} client - The Discord client to process events with
   */
  processEvents(client) {
    const startEvents = Date.now();
    const table = new Table({
      head: [chalk.hex('#FDB93E')('Event Name'), chalk.hex('#FDB93E')('File Path'), chalk.hex('#FDB93E')('Status')],
      colWidths: [30, 50, 10],
      chars: this.tableChars,
    });
    client.events.forEach(event => {
      if (!event.error) {
        if (!event.trigger)
          return table.push([chalk.hex('#FFC864')('Event Missing'), chalk.hex('#FFC864')(event.path), chalk.hex('#FF1C1C')('Failure')]);
        if (!event.name && !event.trigger)
          return table.push([chalk.hex('#FFC864')('Name&Event Missing'), chalk.hex('#FFC864')(event.path), chalk.hex('#FF1C1C')('Failure')]);
        const trigger = event.name ? event.name : event.trigger;
        if (event.once) {
          client.once(event.trigger, (...args) => event.callback(client, ...args));
        } else {
          client.on(event.trigger, (...args) => event.callback(client, ...args));
        }
        table.push([chalk.hex('#FFC864')(trigger), chalk.hex('#FFC864')(event.path), chalk.hex('#1CFF43')('Success')]);
      } else {
        table.push([chalk.hex('#FFC864')(event.error), chalk.hex('#FFC864')(event.path), chalk.hex('#FF1C1C')('Failure')]);
      }
    });
    const endEvents = Date.now();
    const totalEventTime = endEvents - startEvents;
    table.push([chalk.hex('#FDB93E')('Total Runtime'), chalk.hex('#FDB93E')('-'), chalk.hex('#FDB93E')(`${totalEventTime}ms`)]);
    console.log(table.toString());
    return client.emit(Events.ClientReady, client);
  }

  /**
   * Process components.
   * @param {Client} client - The Discord client to process components with
   */
  processComponents(client) {
    const startComponents = Date.now();
    const table = new Table({
      head: [chalk.hex('#FF5BE5')('Event Name'), chalk.hex('#FF5BE5')('File Path'), chalk.hex('#FF5BE5')('Status')],
      colWidths: [30, 50, 10],
      chars: this.tableChars,
    });
    client.components.forEach(component => {
      if (component.error)
        return table.push([chalk.hex('#FF8CED')(`${component.error}`), chalk.hex('#FF8CED')(component.path), chalk.hex('#FF1C1C')('Failure')]);
      if (!component.customId)
        return table.push([chalk.hex('#FF8CED')('customId Missing'), chalk.hex('#FF8CED')(component.path), chalk.hex('#FF1C1C')('Failure')]);
      table.push([chalk.hex('#FF8CED')(component.customId), chalk.hex('#FF8CED')(component.path), chalk.hex('#1CFF43')('Success')]);
    });
    const endComponents = Date.now();
    const totalComponentTime = endComponents - startComponents;
    table.push([chalk.hex('#FF5BE5')('Total Runtime'), chalk.hex('#FF5BE5')('-'), chalk.hex('#FF5BE5')(`${totalComponentTime}ms`)]);
    console.log(table.toString());
  }

  /**
   * Method used to login and being processing commands, events, and components.
   *
   * Will wait for a ClientReady event and output the login time.
   *
   * @override
   * @param {Object} options - Options for login and processing
   * @param {string} options.token - Token used for login - defaults to environment variable 'TOKEN'
   * @param {string} options.processPath - Path to find commands, events, and components - defaults to process root
   * @param {string} options.developers - List of developers, string or array containing user.ids
   * @param {string} options.guildCommandsId - Id of the guild for commands (optional) - defaults to global commands
   * @param {boolean} options.nativeCommandEvent Enable/Disable the built in command event - defaults to enabled
   * @param {boolean} options.nativeComponentEvent Enable/Disable the built in component event - defaults to enabled
   * @param {boolean} options.nativeModalEvent Enable/Disable the built in modal event - defaults to disabled
   * @param {boolean} options.nativeReloadCommand Enable/Disable the built in reload command - defaults to enabled
   * @throws {Error} Throws an error if environment variable TOKEN is missing and a token is not provided.
   */
  login() {
    const { token, processPath, guildCommandsId, nativeCommandEvent, nativeComponentEvent, nativeModalEvent } = this;
    const dirPath = processPath ? path.join(process.cwd(), processPath) : process.cwd();
    const readyStart = process.hrtime();
    super.once(Events.ClientReady, async client => {
      const readyEnd = process.hrtime(readyStart);
      const readyTotal = (readyEnd[0] * 1e9 + readyEnd[1]) / 1e6;
      console.log(chalk.hex('#92fc74')(`Logged in as ${client.user.tag} (${readyTotal.toFixed(2)}ms)`));
      await this.processApp(client, guildCommandsId, dirPath);
      client.on(Events.InteractionCreate, interaction => {
        if (nativeCommandEvent) {
          if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
            return client.emit(Events.CommandEvent, (client, interaction));
          }
        }
        if (nativeComponentEvent) {
          if (interaction.isButton() || interaction.isAnySelectMenu()) {
            return client.emit(Events.ComponentEvent, (client, interaction));
          }
        }
        if (nativeModalEvent) {
          if (interaction.isModalSubmit()) {
            return client.emit(Events.ModalEvent, (client, interaction));
          }
        }
      });
    });
    super.login(token);
  }
}
module.exports = ShardClient;
