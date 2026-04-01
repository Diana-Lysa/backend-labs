const { Transform, pipeline } = require('stream');

class UpperCaseStream extends Transform {
    _transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const result = input.replace(/[^\d]/g, (char) => char.toUpperCase());
        this.push(result);
        callback();
    }
}
// 33 жовтий 
class HighlightStream extends Transform {
    constructor(config) {
        super();
        this.config = config; 
        this.numberColor = "\x1b[33m"; 
        this.reset = "\x1b[0m";     
    }

    _transform(chunk, encoding, callback) {
        let text = chunk.toString();

        // Підсвічуємо числа
        text = text.replace(/\d+/g, (match) => `${this.numberColor}${match}${this.reset}`);

        // Підсвічуємо ключові слова
        for (const [word, color] of Object.entries(this.config)) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            text = text.replace(regex, (match) => `${color}${match}${this.reset}`);
        }

        this.push(text);
        callback();
    }
}

//    Статистика рахує слова та символи
class StatisticsStream extends Transform {
    constructor() {
        super();
        this.charCount = 0;
        this.wordCount = 0;
    }

    _transform(chunk, encoding, callback) {
        const text = chunk.toString().trim();
        console.log(text);
        if (text.length > 0) {
            this.charCount += text.length;
            this.wordCount += text.split(/\s+/).filter(w => w.length > 0).length;
        }

        const report = `\n[СТАТИСТИКА] Символів: ${this.charCount}, Слів: ${this.wordCount}\n`;
        this.push(chunk); 
        process.stdout.write(report); 
        callback();
    }
}

//    НАЛАШТУВАННЯ ТА ЗАПУСК

// Кольори для терміналу : 32m - зелений, 34m - синій, 31m - червоний 35 - пурпурний
const myColors = {
    "node": "\x1b[32m", 
    "js": "\x1b[34m",
    "error": "\x1b[31m",
    "diana": "\x1b[35m" 
};

const upperStream = new UpperCaseStream();
const highlightStream = new HighlightStream(myColors);
const statsStream = new StatisticsStream();

//console.log("Введіть текст у консоль (наприклад: 'node js 2026 error'):");

// З'єднуємо потоки: Ввід -> Регістр -> Підсвітка -> Статистика -> Вивід
process.stdin
    .pipe(upperStream)
    .pipe(highlightStream)
    .pipe(statsStream)
    .pipe(process.stdout);