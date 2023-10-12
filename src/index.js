const ShardClient = require('./classes/Bot');
const { ClientOptions } = require('./classes/util/ClientOptions');

const { CommandContext } = require('./classes/builders/Context');
const { ComponentContext } = require('./classes/builders/Context');

const { CommandBuilder } = require('./classes/builders/Commands');
const { SubcommandBuilder } = require('./classes/builders/Subcommands');
const { ComponentBuilder } = require('./classes/builders/Components');
const { EventBuilder } = require('./classes/builders/Events');
const { Events } = require('./classes/builders/Events');

module.exports = {
  ShardClient,
  ClientOptions,
  CommandContext,
  ComponentContext,
  CommandBuilder,
  SubcommandBuilder,
  ComponentBuilder,
  EventBuilder,
  Events,
};
