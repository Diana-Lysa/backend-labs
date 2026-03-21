const products = {
    101: { id: 101, name: 'Laptop', price: 1000, stock: 5 },
    102: { id: 102, name: 'Mouse', price: 25, stock: 50 },
    103: { id: 103, name: 'Keyboard', price: 75, stock: 0 }
};

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = products[productId];
            if (product) resolve(product);
            else reject(new Error('Product not found'));
        }, 100);
    });
}

function checkStock(product) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (product.stock > 0) resolve(product);
            else reject(new Error('Out of stock'));
        }, 100);
    });
}

function calculateTotal(product, quantity) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                product: product.name,
                quantity: quantity,
                unitPrice: product.price,
                total: product.price * quantity
            });
        }, 100);
    });
}

function placeOrder(productId, quantity) {
    return getProduct(productId)
        .then(product => checkStock(product))
        .then(product => calculateTotal(product, quantity))
        .catch(err => {
            return { error: err.message };
        });
}

placeOrder(101, 2).then(result => console.log(' Тест 7.5a:', result));
placeOrder(103, 1).then(result => console.log('Тест 7.5b:', result));
placeOrder(999, 1).then(result => console.log('Тест 7.5c:', result));