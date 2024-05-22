const { Partials, GatewayIntentBits } = require('discord.js');
/**
 * Options builder for configuring the ShardClient.
 * @class
 */
class ClientOptions {
  /**
   * Creates an instance of ClientOptions.
   */
  constructor() {
    this.options = {
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
      intents: [
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ],
      nativeCommandEvent: true,
      nativeComponentEvent: true,
      nativeModalEvent: false,
      nativeReloadCommand: true,
    };
  }

  /**
   * Set the authentication token for login.
   * @param {string} token - The authentication token.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setToken(token) {
    this.options.token = token;
    return this;
  }

  /**
   * Set the path to find commands, events, and components.
   * @param {string} processPath - The path to the commands, events, and components.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setProcessPath(processPath) {
    this.options.processPath = processPath;
    return this;
  }

  /**
   * Set the guild ID for specifying guild-specific commands (optional).
   * @param {string} guildCommandsId - The guild ID for specifying guild-specific commands.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setGuildCommandsId(guildCommandsId) {
    this.options.guildCommandsId = guildCommandsId;
    return this;
  }

  /**
   * Enable or disable the built-in command event.
   * @param {boolean} enabled - Whether to enable or disable the built-in command event.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setNativeCommandEvent(enabled) {
    this.options.nativeCommandEvent = enabled;
    return this;
  }

  /**
   * Enable or disable the built-in component event.
   * @param {boolean} enabled - Whether to enable or disable the built-in component event.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setNativeComponentEvent(enabled) {
    this.options.nativeComponentEvent = enabled;
    return this;
  }

  /**
   * @description NOT YET IMPLIMENTED
   * Enable or disable the built-in modal event.
   * @param {boolean} enabled - Whether to enable or disable the built-in modal event.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setNativeModalEvent(enabled) {
    this.options.nativeModalEvent = enabled;
    return this;
  }
  /**
   * Enable or disable the built-in reload command.
   * @param {boolean} enabled - Whether to enable or disable the built-in reload command.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setNativeReloadCommand(enabled) {
    this.options.nativeReloadCommand = enabled;
    return this;
  }
  /**
   * Set the intents to be used in client creation.
   * @param {Array} intents - Intents to be used.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setIntents(intents) {
    if (intents && !Array.isArray(intents)) throw new Error('Client intents must be an array.');
    this.options.intents = intents;
    return this;
  }
  /**
   * Set the partials to be used in client creation.
   * @param {Array} partials - Partials to be used.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setPartials(partials) {
    if (partials && !Array.isArray(partials)) throw new Error('Client partials must be an array.');
    this.options.partials = partials;
    return this;
  }
  /**
   * Create an array or string containing a list of developer ids.
   * @param {string} developers - String or array of developer ids.
   * @returns {ClientOptions} - The ClientOptions instance for method chaining.
   */
  setDevelopers(developers) {
    this.options.developers = developers;
    return this;
  }

  /**
   * @private
   * @returns {Object} - Client options in object form
   */
  getOptions() {
    return this.options;
  }
}

module.exports = { ClientOptions };
