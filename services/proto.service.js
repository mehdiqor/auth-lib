const logger = require('../helpers/init-logger.helpers');
const protobufjs = require('protobufjs');

class ProtoService {
  protoToJson(buffer, config) {
    try {
      logger.debug('converting proto buffer to JSON');

      const root = protobufjs.loadSync(config.path);
      const MessageType = root.lookupType(config.messageType);

      const message = MessageType.decode(buffer);

      const result = MessageType.toObject(message, {
        longs: String,
        defaults: true,
      });

      logger.debug('proto buffer converted to JSON');

      return result;
    } catch (error) {
      logger.error(`Proto To Json Error: ${error.message}`, error);
      throw error;
    }
  }

  JsonToProto(data, config) {
    try {
      logger.debug('converting JSON to proto buffer');

      const root = protobufjs.loadSync(config.path);
      const MessageType = root.lookupType(config.messageType);

      const errMsg = MessageType.verify(data);

      if (errMsg) {
        logger.error(`MessageType Error: ${errMsg.message}`, errMsg);
        throw errMsg;
      }

      const message = MessageType.create(data);
      const result = MessageType.encode(message).finish();

      logger.debug('JSON converted to proto buffer');

      return result;
    } catch (error) {
      logger.error(`Json To Proto Error: ${error.message}`, error);
      throw error;
    }
  }
}

module.exports = {
  ProtoService: new ProtoService(),
};
