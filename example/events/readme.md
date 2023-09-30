# Event Examples

With ShardClient, you can organize your events in seperate files, create multiple instances of the same event, as well as optionally name your events for your particular organization needs.

## Files

- **[event.js](./event.js)**: Demonstrates how to create a simple "ready" event.

## Usage

**Importing**

```javascript
const { EventBuilder, Events } = require('shardclient');
```

**Building**

```javascript
module.exports = new EventBuilder();
```
