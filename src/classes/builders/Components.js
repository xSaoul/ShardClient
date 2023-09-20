class ComponentBuilder {
  constructor() {
    this._type = 'components';
  }
  /**
   * Sets the customId that should trigger this component.
   * @param {String} customId The customId to use
   */
  setCustomId(customId) {
    this.customId = customId;
    return this;
  }
  /**
   * Sets callback function to be run when the file is called
   * @param {*} callback Code to be executed
   */
  setCallback(callback) {
    this.callback = callback;
    return this;
  }
}
module.exports = { ComponentBuilder };
