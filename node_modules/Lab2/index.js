const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. ДОПОМІЖНИЙ ШЛЯХ у
    if (req.url === '/set') {
        res.setHeader('Set-Cookie', 'user_info=user1; Path=/');
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Куку "user_info=user1" встановлено! Тепер повернися на головну сторінку: http://localhost:3000');
        return;
    }

    // 3. ОСНОВНА ЛОГІКА ЗАВДАННЯ
    const cookieHeader = req.headers.cookie || '';
    
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name) acc[name] = value;
        return acc;
    }, {});

    const userInfo = cookies['user_info'];

    res.setHeader('Content-Type', 'application/json');

    if (userInfo === 'user1') {
        const userData = {
            "id": 1,
            "firstName": "Leanne",
            "lastName": "Graham"
        };
        res.writeHead(200);
        res.end(JSON.stringify(userData));
    } else {
        res.writeHead(200);
        res.end(JSON.stringify({}));
    }
});

server.listen(PORT, () => {
    console.log(`СЕРВЕР ЗАПУЩЕНО!`);
    console.log(`1. Головна сторінка: http://localhost:${PORT}`);
    console.log(`2. Встановити куку автоматично: http://localhost:${PORT}/set`);
});