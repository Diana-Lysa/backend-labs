function makePromiseResolveWith(value) {
    return Promise.resolve(value);
}

makePromiseResolveWith(5)
    .then(value => console.log('Тест 2.1:', value));