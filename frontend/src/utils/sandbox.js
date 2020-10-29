const axios = require('axios');

(async function (params) {
  const response = await axios.post('http://localhost:4000/posts', {
    data: 'test',
  });

  console.log('@response');
  console.log(response);
})();
