// javascript

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://backend:80', changeOrigin: true }));
app.use('/catpng', createProxyMiddleware({ target: 'http://localhost:3000/home', changeOrigin: true }));
app.listen(3000);

// http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar