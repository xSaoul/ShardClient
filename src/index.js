const ShardClient = require('./classes/Bot');

const { CommandContext } = require('./classes/builders/Context');
const { ComponentContext } = require('./classes/builders/Context');

const { CommandBuilder } = require('./classes/builders/Commands');
const { SubcommandBuilder } = require('./classes/builders/Subcommands');
const { EventBuilder } = require('./classes/builders/Events');
const { ComponentBuilder } = require('./classes/builders/Components');

module.exports = { ShardClient, CommandContext, ComponentContext, CommandBuilder, SubcommandBuilder, EventBuilder, ComponentBuilder };
