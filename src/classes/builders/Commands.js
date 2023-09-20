const { SlashCommandBuilder } = require('discord.js');

/**
 * A custom command builder that extends the SlashCommandBuilder class from discord.js.
 * This builder is used to create commands for Discord slash commands.
 */
class CommandBuilder extends SlashCommandBuilder {
  /**
   * Creates an instance of the CommandBuilder.
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
     * Indicates whether the command should be included in the help menu.
     * Default is false.
     * @type {Boolean}
     */
    this.help = false;
  }

  /**
   * Sets the command category.
   * @param {String} category - The category to be used.
   * @returns {CommandBuilder} - Returns the CommandBuilder instance for chaining.
   */
  setCategory(category) {
    this.category = category;
    return this;
  }

  /**
   * Sets whether or not the command should be included in the help menu.
   * @param {Boolean} enabled - True if the command should be displayed in the help menu.
   * @returns {CommandBuilder} - Returns the CommandBuilder instance for chaining.
   */
  setHelp(enabled) {
    this.help = enabled;
    return this;
  }

  /**
   * Sets the callback function to be run when the command is called.
   * @param {Function} callback - The function to be executed when the command is invoked.
   * @returns {CommandBuilder} - Returns the CommandBuilder instance for chaining.
   */
  setCallback(callback) {
    this.callback = callback;
    return this;
  }

  /**
   * Sets the autocallback function to be run when the autocomplete function is called.
   * @param {Function} autocallback - The function to be executed when an autocomplete option is invoked.
   * @returns {CommandBuilder} - Returns the CommandBuilder instance for chaining.
   */
  setAutoCallback(autocallback) {
    this.autocallback = autocallback;
    return this;
  }
}

module.exports = { CommandBuilder };
