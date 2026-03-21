function analyzeResults(promises) {
    return Promise.allSettled(promises)
        .then(results => {

            const successfulCount = results.filter(res => res.status === 'fulfilled').length;

            const failedCount = results.filter(res => res.status === 'rejected').length;

            return {
                successful: successfulCount,
                failed: failedCount,
                results: results
            };
        });
}

const testPromises1 = [
    Promise.resolve(1),
    Promise.reject(new Error('Fail')),
    Promise.resolve(3),
    Promise.reject(new Error('Another fail')),
    Promise.resolve(5)
];

analyzeResults(testPromises1)
    .then(stats => {
        console.log(' Тест 11.1:', stats);
    });