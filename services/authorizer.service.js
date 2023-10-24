class DataAuthorizer {
  async httpAuthorizer(data) {
    let response = false;

    return response;
  }

  async coapAuthorizer(data) {
    let response = false;

    return response;
  }

  async mqttAuthorizer(data) {
    let response = false;

    return response;
  }

  async socketAuthorizer(data) {
    let response = false;

    return response;
  }
}

module.exports = {
  DataAuthorizer: new DataAuthorizer(),
};
