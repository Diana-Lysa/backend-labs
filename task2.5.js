function callbackToPromise(value) {
    return new Promise((resolve) => {
        const simulatedAsyncTask = (val, callback) => {
            setTimeout(() => {
                callback(null, 'Processed: ' + val);
            }, 100);
        };

        simulatedAsyncTask(value, (error, result) => {
            if (error) {
                return; 
            }
            resolve(result);
        });
    });
}

callbackToPromise('test')
    .then(result => console.log(' Тест 2.5:', result)); 
