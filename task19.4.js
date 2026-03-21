async function retryWithLogging(fn, maxRetries, options = {}) {
    const {
        initialDelay = 100,
        maxDelay = 5000,
        onRetry = null
    } = options;

    let currentDelay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) throw error;

            if (onRetry) {
                onRetry(attempt, error, currentDelay);
            }
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay = Math.min(currentDelay * 2, maxDelay);
        }
    }
}

let attempt4 = 0;
function trackableFunction() {
    attempt4++;
    if (attempt4 < 4) {
        return Promise.reject(new Error(`Fail ${attempt4}`));
    }
    return Promise.resolve('Success!');
}

console.log(' Запуск тесту 19.4 ');
retryWithLogging(trackableFunction, 5, {
    initialDelay: 50,
    maxDelay: 500,
    onRetry: (attempt, error, delay) => {
        console.log(` Retry ${attempt}: ${error.message}, waiting ${delay}ms`);
    }
})
    .then(result => console.log(' Тест 19.4 результат:', result));