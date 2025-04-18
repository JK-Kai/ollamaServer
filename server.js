const http = require('http');
const httpProxy = require('http-proxy');
const express = require('express');

const app = express();

// ✅ Force full CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const proxy = httpProxy.createProxyServer({ target: 'http://localhost:11434', changeOrigin: true });

// Rewrites Janitor's expected path → Ollama's path
app.all('/v1/chat/completions', (req, res) => {
  req.url = '/api/chat';
  proxy.web(req, res, {}, (e) => {
    console.error('Proxy error:', e);
    res.writeHead(500);
    res.end('Proxy error');
  });
});

const PORT = 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`🚀 Proxy listening at http://localhost:${PORT}`);
});
