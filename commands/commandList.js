// List of commands to display to user
const commandListforDisplay = [
    {
        command: 'ADD PRODUCT',
        signature: '"PRODUCT NAME" SKU',
        desc: 'Add a product to the catalog'
    },
    {
        command: 'ADD WAREHOUSE',
        signature: 'WAREHOUSE# [STOCK_LIMIT]',
        desc: 'Create a new warehouse with optional stock limit'
    },
    {
        command: 'STOCK',
        signature: 'SKU WAREHOUSE# QTY',
        desc: 'Add an amount of a product to a warehouse'
    },
    {
        command: 'UNSTOCK',
        signature: 'SKU WAREHOUSE# QTY',
        desc: 'Remove an amount of a product from a warehouse'
    },
    {
        command: 'LIST PRODUCTS',
        signature: '',
        desc: 'List all product in the catalog'
    },
    {
        command: 'LIST WAREHOUSES',
        signature: '',
        desc: 'List all warehouses'
    },
    {
        command: 'LIST WAREHOUSE',
        signature: 'WAREHOUSE#',
        desc: 'List all products stocked in a warehouse'
    },
    {
        command: 'HELP',
        signature: '',
        desc: 'This dialogue'
    },
    {
        command: 'EXIT',
        signature: '',
        desc: 'Quit the REPL demo'
    }
];

module.exports = commandListforDisplay;