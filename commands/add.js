const add = (cmd, store) => {
    const entity = cmd[1]; // Determine what to add
    if (entity === 'PRODUCT') { // Add a product
        return addProduct(cmd.slice(2, -1), cmd[cmd.length - 1], store);
    } else if (entity === 'WAREHOUSE') { // Add a warehouse
        return addWarehouse(cmd[2], cmd[3] || 0, store);
    } else { // If not product or warehouse
        return 'Error: Could not add "' + entity + '"; must be "PRODUCT" or "WAREHOUSE"';
    }
}

const addProduct = (productName, sku, store) => {
  
    // Validate sku is unique
    if (!store.products.every(p => p.sku !== sku)) {
        return 'Error: Product sku already exists';
    }

    // Trim quotation marks (if present)
    let productNameJoined = productName.join(' ');
    if (productNameJoined.startsWith('"') && productNameJoined.endsWith('"')) { productNameJoined = productNameJoined.slice(1, -1)};
    
    // Add product to data store, return success
    store.products.push({
        productName: productNameJoined,
        sku: sku
    })
    return 'Added Product ' + productNameJoined;
}

const addWarehouse = (warehouseNumber, limit, store) => {
  
    // Validate warehouseNumber is unique
    if (!store.warehouses.every(w => w.warehouseNumber !== warehouseNumber)) {
        return 'Error: Warehouse ' + warehouseNumber + ' already exists';
    }

    // Add warehouse to data store, return success
    store.warehouses.push({
        warehouseNumber: warehouseNumber,
        limit: parseInt(limit),
        inventory: []
    })
    return 'Added Warehouse ' + warehouseNumber;
}

module.exports = add;