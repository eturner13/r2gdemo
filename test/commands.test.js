const commandHandler = require('../commands/command');
const store = require('../data/JSONstore');

test('Add a product', () => {
    expect(commandHandler('ADD PRODUCT TEST PRODUCT 11111-22222\n', store))
        .toMatch('Added Product TEST PRODUCT');
});

test('Add a second product', () => {
    expect(commandHandler('ADD PRODUCT TEST PRODUCT 2 33333-44444\n', store))
        .toMatch('Added Product TEST PRODUCT 2');
});

test('List added products', () => {
    expect(commandHandler('LIST PRODUCTS\n', store))
        .toMatch('Product List:\nTEST PRODUCT 11111-22222\nTEST PRODUCT 2 33333-44444');
});

test('Add a warehouse with limit', () => {
    expect(commandHandler('ADD WAREHOUSE 30066 30\n', store))
        .toMatch('Added Warehouse 30066');
});

test('Add a second warehouse with no limit', () => {
    expect(commandHandler('ADD WAREHOUSE 90210\n', store))
        .toMatch('Added Warehouse 90210');
});

test('List added warehouses', () => {
    expect(commandHandler('LIST WAREHOUSES\n', store))
        .toMatch('Warehouse List:\n30066 [0/30]\n90210 [0/Infinite]');
});

test('Stock a product', () => {
    expect(commandHandler('STOCK 11111-22222 30066 20\n', store))
        .toMatch('Stocked 20 TEST PRODUCT in Warehouse 30066');
});

test('List individual warehouse', () => {
    expect(commandHandler('LIST WAREHOUSE 30066\n', store))
        .toMatch('Warehouse 30066 - Inventory: [20/30]\nProduct Name | Product SKU | Quantity\nTEST PRODUCT | 11111-22222 | 20');
});

test('Unstock a product', () => {
    expect(commandHandler('UNSTOCK 11111-22222 30066 20\n', store))
        .toMatch('Unstocked 20 TEST PRODUCT from Warehouse 30066');
});