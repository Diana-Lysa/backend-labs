function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age < 0) {
            reject('Invalid age');
        } 
        else if (age < 18) {
            reject('Too young');
        } 
        else if (age >= 18 && age < 65) {
            resolve({ age: age, category: 'adult' });
        } 
        else {
            resolve({ age: age, category: 'senior' });
        }
    });
}

checkAge(25)
    .then(res => console.log(' Тест (adult):', res))
    .catch(err => console.error(' Помилка:', err));

checkAge(70)
    .then(res => console.log(' Тест (senior):', res))
    .catch(err => console.error(' Помилка:', err));

checkAge(15)
    .then(res => console.log(' Успіх (не має бути):', res))
    .catch(err => console.log(' Тест (too young):', err));

checkAge(-5)
    .then(res => console.log(' Успіх (не має бути):', res))
    .catch(err => console.log(' Тест (invalid age):', err));