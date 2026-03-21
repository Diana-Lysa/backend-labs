function transformWithHistory(text) {
    const result = {
        original: text,
        steps: [],
        final: ''
    };

    return Promise.resolve(result)
        .then(data => {
            const transformed = data.original.toLowerCase();
            data.steps.push(transformed);
            return data;
        })
        .then(data => {
            const lastStep = data.steps[data.steps.length - 1];
            const transformed = lastStep.replace(/\s+/g, '');
            data.steps.push(transformed);
            return data;
        })
        .then(data => {
            const lastStep = data.steps[data.steps.length - 1];
            const transformed = lastStep.split('').reverse().join('');
            data.steps.push(transformed);
            data.final = transformed;
            return data;
        });
}

transformWithHistory('Hello World')
    .then(result => console.log(' Тест 7.6:', result));