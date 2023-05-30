const express = require('express');
const router = express.Router();
const needle = require('needle');

needle.get('http://backend:80', function(error, response) {
  if (!error && response.statusCode == 200)
    console.log(response.body);
});

module.exports = router;