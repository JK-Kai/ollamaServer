1. install Ollama
2. install nodejs
3. npm install
4. npm server.js
5. install ngrok
6. direct http 11434 using ngrok
7. curl -Method POST https://{address ngrok give}/v1/chat/completions `
>>   -Headers @{ "Content-Type" = "application/json" } `
>>   -Body '{ "model": "deepseek-r1:7b", "messages": [ { "role": "user", "content": "Hello" } ], "stream": false }'
