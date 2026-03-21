class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

async function conditionalRetry(fn, maxRetries, shouldRetry) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (!shouldRetry(error)) {
                throw error;
            }

            console.log(` Спроба ${i + 1} не вдалася (${error.name}). Повторюємо...`);
        }
    }
    throw lastError;
}

let attempt3 = 0;
function apiWithDifferentErrors() {
    attempt3++;
    if (attempt3 === 1) {
        return Promise.reject(new NetworkError('Connection failed'));
    }
    if (attempt3 === 2) {
        return Promise.reject(new ValidationError('Invalid data'));
    }
    return Promise.resolve('Success');
}

console.log('--- Запуск тесту 19.3 ---');

conditionalRetry(
    apiWithDifferentErrors,
    5,
    (error) => error.name === 'NetworkError'
)
    .then(res => console.log('Результат:', res))
    .catch(error => {
        console.log(' Тест 19.3 завершено. Отримана помилка:', error.name);
        console.log('Повідомлення:', error.message);
    });