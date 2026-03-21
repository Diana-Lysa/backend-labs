function validateEmail(email) {
    return new Promise((resolve, reject) => {
        if (email.includes('@') && email.includes('.')) {
            resolve(email);
        } else {
            reject("Некоректний формат email (відсутній @ або .)");
        }
    });
}

validateEmail('test@example.com')
    .then(email => console.log(' Тест 1.3 (валідний):', email))
    .catch(err => console.log(' Помилка:', err));

validateEmail('invalid-email')
    .then(email => console.log('   Не повинно виконатися'))
    .catch(err => console.log(' Тест 1.3 (невалідний):', err));