function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || username.trim() === "") {
            reject('Username is required');
        } 
        else if (!password || password.trim() === "") {
            reject('Password is required');
        } 
        else if (password.length < 6) {
            reject('Password too short');
        } 
        else {
            resolve({
                username: username,
                authenticated: true
            });
        }
    });
}

authenticateUser('john', 'password123')
    .then(user => console.log(' Тест 1.4 (успіх):', user))
    .catch(err => console.log('   Помилка:', err));

authenticateUser('', 'password123')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (немає username):', err));

authenticateUser('john', '12345')
    .then(user => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.4 (короткий пароль):', err));