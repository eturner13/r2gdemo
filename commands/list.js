const list = (cmd, store) => {
    const entity = cmd[1]; // Determine what to list
    if (entity === 'PRODUCTS') { // List all products
        return listProducts(store);
    } else if (entity === 'WAREHOUSES') { // List all warehouses
        return listWarehouses(store); 
    } else if (entity === 'WAREHOUSE') { // List a warehouse's info
        return listWarehouse(cmd[2], store);
    } else { // If not product or warehouse
        return 'Error: Could not list "' + entity + '"; must be "PRODUCTS", "WAREHOUSES", or "WAREHOUSE (warehouse#)"';
    }
}

const listProducts = store => {
    let products = '';

    // List products and skus
    store.products.forEach(p => {
        products = products + '\n' + p.productName + ' ' + p.sku;
    });
    return 'Product List:' + products;
}

const listWarehouses = store => {
    let warehouses = '';

    // Assemble warehouses and limits
    store.warehouses.forEach(w => {
        const invTotal = w.inventory.reduce((a, i) => {return a + i.qty}, 0);
        warehouses = warehouses + '\n' + w.warehouseNumber + ' [' + invTotal + '/' + (w.limit !== 0 ? + w.limit : 'Infinite') + ']';
    });
    return 'Warehouse List:' + warehouses;
}

const listWarehouse = (warehouseNumber, store) => {

    // Validate warehouseNumber was entered
    if (!warehouseNumber) {
        return 'Error: Warehouse number not provided';
    }

    // Find warehouse in data store
    warehouse = store.warehouses.find(w => w.warehouseNumber === warehouseNumber);

    // Validate warehouse exists
    if (!warehouse) {
        return 'Error: Warehouse ' + warehouseNumber + ' not found; Type "list warehouses" to list valid warehouses';
    }

    // Return warehouse info
    const title = 'Warehouse ' + warehouse.warehouseNumber;
    const invTotal = warehouse.inventory.reduce((a, i) => {return a + i.qty}, 0);
    const invSummary = ' - Inventory: [' + invTotal + '/' + (warehouse.limit !== 0 ? + warehouse.limit : 'Infinite') + ']';
    const header = '\nProduct Name | Product SKU | Quantity';
    let invList = '';
    warehouse.inventory.forEach(i => {
        const q = i.qty + ' ';
        const product = store.products.find(p => p.sku === i.sku);
        invList = invList + '\n' + product.productName + ' | ' + i.sku + ' | ' + i.qty;
    });
    return title + invSummary + header + invList;
}

module.exports = list;