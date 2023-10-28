const { METHODS, CONFIGS } = require('../utils/constants.utility');
const { validateAuthData } = require('../services/auth.service');
const { ProtoService } = require('../services/proto.service');
const logger = require('../helpers/init-logger.helpers');

class Processor {
  constructor(protocol) {
    this.protocol = protocol;
    this.outputConfig = CONFIGS.RESPONSE;
    this.httpConfig = CONFIGS.HTTP;
    this.coapConfig = CONFIGS.COAP;
    this.mqttConfig = CONFIGS.MQTT;
    this.socketConfig = CONFIGS.SOCKET;

    this.checkProtocol();
  }

  checkProtocol() {
    if (!Object.values(METHODS).includes(this.protocol))
      throw new Error('Invalid protocol');
  }

  findConfigByProtocol() {
    let config;

    logger.debug(`finding proto config by protocol ${this.protocol}`);

    switch (this.protocol) {
      case METHODS.HTTP:
        config = this.httpConfig;
        break;

      case METHODS.COAP:
        config = this.coapConfig;
        break;

      case METHODS.MQTT:
        config = this.mqttConfig;
        break;

      case METHODS.SOCKETIO:
        config = this.socketConfig;
        break;

      default:
        config = undefined;
    }

    return config;
  }

  jsonToProto(data, config) {
    if (!config) config = this.findConfigByProtocol();

    const toProto = ProtoService.JsonToProto(data, config);

    return toProto;
  }

  protoToJson(data, config) {
    if (!config) config = this.outputConfig;

    const toJson = ProtoService.protoToJson(data, config);

    return toJson;
  }

  async validator(data) {
    const config = this.findConfigByProtocol();

    const jsonData = this.protoToJson(data, config);

    const result = await validateAuthData(jsonData);

    logger.info(`data validated, converting data to proto buffer...`);

    const protoData = this.jsonToProto(result, this.outputConfig);

    return protoData;
  }
}

module.exports = Processor;
