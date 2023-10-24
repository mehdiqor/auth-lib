const logger = require('../helpers/init-logger.helpers');
const protobufjs = require('protobufjs');

class ProtoService {
  protoToJson(buffer, config) {
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
  }

  JsonToProto(data, config) {
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
  }
}

module.exports = {
  ProtoService: new ProtoService(),
};
