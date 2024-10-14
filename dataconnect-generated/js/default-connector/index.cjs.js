const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'peteryang',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

