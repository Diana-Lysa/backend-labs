function validateData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value < 0) reject(new Error('Negative value'));
            else resolve({ ...data, validated: true });
        }, 50);
    });
}

function processData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.value > 100) reject(new Error('Value too large'));
            else resolve({ ...data, processed: true, result: data.value * 2 });
        }, 50);
    });
}

function saveData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.8) reject(new Error('Database error'));
            else resolve({ ...data, saved: true });
        }, 50);
    });
}

async function processBatchWithDetails(items) {
    const batchPromises = items.map(item => {
        return validateData(item)
            .then(validated => processData(validated))
            .then(processed => saveData(processed))
            .catch(err => {
                throw { id: item.id, error: err.message };
            });
    });

    const results = await Promise.allSettled(batchPromises);

    const report = {
        totalItems: items.length,
        fullyProcessed: 0,
        failed: 0,
        details: []
    };

    results.forEach(res => {
        if (res.status === 'fulfilled') {
            report.fullyProcessed++;
            report.details.push({ 
                id: res.value.id, 
                status: 'success', 
                data: res.value 
            });
        } else {
            report.failed++;
            report.details.push({ 
                id: res.reason.id, 
                status: 'error', 
                message: res.reason.error 
            });
        }
    });

    return report;
}


const dataItems = [
    { id: 1, value: 10 },   
    { id: 2, value: -5 },   
    { id: 3, value: 50 },   
    { id: 4, value: 150 },  
    { id: 5, value: 30 }   
];

console.log(' Починаємо пакетну обробку...');

processBatchWithDetails(dataItems)
    .then(report => {
        console.log(' Звіт про обробку (Тест 11.5):');
        console.log(`Всього елементів: ${report.totalItems}`);
        console.log(`Успішно оброблено: ${report.fullyProcessed}`);
        console.log(`Помилок: ${report.failed}`);
        console.log('Деталі по кожному ID:');
        report.details.forEach(item => {
            const statusIcon = item.status === 'success' ? 'yes' : 'no';
            const msg = item.status === 'success' ? 'OK' : item.message;
            console.log(`${statusIcon} ID ${item.id}: ${msg}`);
        });
    });