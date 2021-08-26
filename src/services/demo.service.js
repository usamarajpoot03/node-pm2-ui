const axios = require('../helpers/axiosConfig')
module.exports = {
  getData: async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      return res.data;
  },
};
