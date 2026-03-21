function processUser(user) {
    return Promise.resolve(user)
        .then(u => {
            u.name = u.name.toUpperCase();
            return u;
        })
        .then(u => {
            u.isAdult = u.age >= 18;
            return u;
        })
        .then(u => {
            u.nameLength = u.name.length;
            return u;
        });
}

processUser({ name: 'john doe', age: 25 })
    .then(result => console.log(' Тест 7.2:', result));