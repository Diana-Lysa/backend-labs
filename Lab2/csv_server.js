const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const PORT = 3000;
const FILE_NAME = 'data.csv';

const server = http.createServer((req, res) => {
    const results = [];
    let headers = null;

    // Читаємо файл через потоки (Streams)
    fs.createReadStream(FILE_NAME)
        .pipe(split2()) 
        .pipe(through2((chunk, enc, callback) => {
            const row = chunk.toString().split(',');

            if (!headers) {
                headers = row;
            } else {
                // Перетворюємо рядок у об'єкт
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header.trim()] = row[i] ? row[i].trim() : null;
                });
                results.push(obj);
            }
            callback();
        }))
        .on('finish', () => {
            // Коли все прочитано — відправляємо JSON
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(results, null, 2));
        })
        .on('error', (err) => {
            res.writeHead(500);
            res.end('Error reading CSV file');
        });
});

server.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});