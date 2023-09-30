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

  setIntents(intents) {
    if (intents && !Array.isArray(intents)) throw new Error('Client intents must be an array.');
    this.options.intents = intents;
    return this;
  }

  setPartials(partials) {
    if (partials && !Array.isArray(partials)) throw new Error('Client partials must be an array.');
    this.options.partials = partials;
    return this;
  }

  getOptions() {
    return this.options;
  }
}

module.exports = { ClientOptions };
