const path = require('path');

module.exports = Object.freeze({
  MESSAGES: {
    OK: 'OK',
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED',
  },

  METHODS: {
    HTTP: 'HTTP',
    COAP: 'COAP',
    MQTT: 'MQTT',
    SOCKETIO: 'SOCKETIO',
  },

  CONFIGS: {
    RESPONSE: {
      path: path.join(__dirname, '../proto/output.proto'),
      messageType: 'ResponseMessage',
    },
    HTTP: {
      path: path.join(__dirname, '../proto/http.proto'),
      messageType: 'HTTPMessage',
    },
    COAP: {},
    MQTT: {},
    SOCKET: {},
  },
});
