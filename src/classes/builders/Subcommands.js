const { SlashCommandSubcommandBuilder } = require('discord.js');

/**
 * A custom command builder that extends the SlashCommandSubcommandBuilder class from discord.js.
 * This builder is used to create subcommands for Discord slash commands.
 */
class SubcommandBuilder extends SlashCommandSubcommandBuilder {
  /**
   * Creates an instance of the SubcommandBuilder class.
   * @constructor
   */
  constructor() {
    super();
    /**
     * Type, used for Bot class druing setup.
     * @type {String}
     * @private
     */
    this._type = 'commands';

    /**
     * Indicates whether the command is a subcommand.
     * @type {Boolean}
     * @private
     */
    this.isSubcommand = true;

    /**
     * Indicates whether the subcommand should be included in the help menu.
     * Default is false.
     * @type {Boolean}
     */
    this.help = false;
  }

  /**
   * Sets whether or not the subcommand should be included in the help menu.
   * @param {Boolean} enabled - True if the command should be displayed in the help menu.
   * @returns {SubcommandBuilder} - Returns the SubcommandBuilder instance for chaining.
   */
  setHelp(enabled) {
    this.help = enabled;
    return this;
  }

  /**
   * Sets the main command this subcommand is attached to.
   * @param {String} name - The name of the main command.
   * @returns {SubcommandBuilder} - Returns the SubcommandBuilder instance for chaining.
   */
  setMainCommand(name) {
    this.mainCommand = name;
    return this;
  }

  /**
   * Sets the callback function to be run when the subcommand is called.
   * @param {Function} callback - The function to be executed when the subcommand is invoked.
   * @returns {SubcommandBuilder} - Returns the SubcommandBuilder instance for chaining.
   */
  setCallback(callback) {
    this.callback = callback;
    return this;
  }

  /**
   * Sets the autocallback function to be run when the autocomplete function is called.
   * @param {Function} autocallback - The function to be executed when an autocomplete option is invoked.
   * @returns {SubcommandBuilder} - Returns the SubcommandBuilder instance for chaining.
   */
  setAutoCallback(autocallback) {
    this.autocallback = autocallback;
    return this;
  }
}

module.exports = { SubcommandBuilder };
