function tryCatchPromise(fn, ...args) {
    try {
        const result = fn(...args);
        
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

const goodFunction = (a, b) => a + b;
const badFunction = () => { throw new Error('Oops!'); };

tryCatchPromise(goodFunction, 5, 3)
    .then(result => console.log('Тест 2.7a:', result)); 

tryCatchPromise(badFunction)
    .catch(error => console.log('Тест 2.7b:', error.message)); 