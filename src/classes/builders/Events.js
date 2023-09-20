class EventBuilder {
  constructor() {
    this._type = 'events';
    this.once = false;
  }
  /**
   * Sets the name of this event.
   * @param {String} name The name to use
   */
  setName(name) {
    this.name = name;
    return this;
  }
  /**
   * Sets the event that will trigger this file.
   * @param {String} event The event to use
   * @see {@link https://old.discordjs.dev/#/docs/discord.js/14.13.0/class/Client}
   */
  setTrigger(event) {
    this.trigger = event;
    return this;
  }
  /**
   * Sets if the event is run once or whenever the event is emitted.
   * @param {Boolean} enabled Whether or not the event is emitted once
   */
  setOnce(enabled) {
    this.once = enabled;
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
const { Events: NativeEvents } = require('discord.js');
const Events = {
  ...NativeEvents,
  ComponentEvent: 'componentEvent',
  CommandEvent: 'commandEvent',
  ModalEvent: 'modalEvent',
};
module.exports = { EventBuilder, Events };
