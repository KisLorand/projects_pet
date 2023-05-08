// javascript

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;


app.use(
  '/api/*', 
  createProxyMiddleware({ 
    target: 'http://backend:80',  //target: 'http://backend:5000', 
    changeOrigin: true, 
  })
);

//app.use('/catpng', createProxyMiddleware({ target: 'http://localhost:3000/home', changeOrigin: true }));
app.listen(port, () => {
    console.log(`http-proxy listening on port ${port}`)
  })

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar