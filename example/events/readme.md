# Event Examples

With ShardClient you can have all your events in different files with the added benefit of custom events, as well as having multiple of the same event for organization.

## Files

- event.js shows you how to create a simple ready event.

## Usage

**Importing**
const {EventBuilder, Events} =  require('shardclient');

**Building**
module.exports  =  new  EventBuilder()