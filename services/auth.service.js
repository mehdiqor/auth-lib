const logger = require('../helpers/init-logger.helpers');
const axios = require('axios');

async function validateAuthData(id, data) {
  logger.info(
    `sending data to auth module service with axios for validate data`,
    {
      authId: id,
    },
  );

  const base = process.env['AUTH_MODULE_SERVICE'];
  const url = base + '/auth-module/v1/validate/' + id;

  const result = await axios({
    url,
    method: 'POST',
    headers: { x_api_key: process.env['X_API_KEY'] },
    data,
    proxy: false,
  }).catch(error => {
    logger.crit(`AXIOS ERROR: ${error.message}`, { url, error });

    throw error?.response?.data || error;
  });

  logger.debug('data received from the server');

  return { data: result.data.data };
}

module.exports = {
  validateAuthData,
};
