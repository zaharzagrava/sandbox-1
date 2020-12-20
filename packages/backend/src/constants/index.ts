const constants = {
  NODE_ENV: process.env.NODE_ENV,

  ELASTICSEARCH_NODE: process.env.ELASTICSEARCH_NODE,

  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL
};

console.log('Backend constants:');
console.log(JSON.stringify(constants, undefined, 2));

export default constants;
