// javascript

const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post('http://localhost:3000/api/Auth/login', function (req, res) {
  res.send('<b>My</b> first express http server');
});

app.use(function(req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// app.use('/api', require('./router.js'))
// app.use(
//   '/api/*', 
//   createProxyMiddleware({ 
//     target: 'http://backend:80',  //target: 'http://backend:5000', 
//     changeOrigin: true, 
//   })
// );

// //app.use('/catpng', createProxyMiddleware({ target: 'http://localhost:3000/home', changeOrigin: true }));
// app.listen(PORT, () => {
//     console.log(`http-proxy listening on port ${port}`)
//   })

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar