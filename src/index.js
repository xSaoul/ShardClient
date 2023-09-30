const ShardClient = require('./classes/Bot');
const { ClientOptions } = require('./classes/util/ClientOptions');

const { CommandContext } = require('./classes/builders/Context');
const { ComponentContext } = require('./classes/builders/Context');

const { CommandBuilder } = require('./classes/builders/Commands');
const { SubcommandBuilder } = require('./classes/builders/Subcommands');
const { EventBuilder } = require('./classes/builders/Events');
const { ComponentBuilder } = require('./classes/builders/Components');

module.exports = { ShardClient, ClientOptions, CommandContext, ComponentContext, CommandBuilder, SubcommandBuilder, EventBuilder, ComponentBuilder };
