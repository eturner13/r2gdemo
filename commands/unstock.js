const unstock = (cmd, store) => {
    const sku = cmd[1];
    const product = store.products.find(p => p.sku === sku);
    const warehouseNumber = cmd[2];
    const warehouse = store.warehouses.find(w => w.warehouseNumber === warehouseNumber);
    let qty = parseInt(cmd[3]);

    // Validate sku exists
    if (!product) {
        return 'Error: Sku ' + sku + ' not found';
    }

    // Validate warehouse exists
    if (!warehouse) {
        return 'Error: Warehouse ' + warehouseNumber + ' not found';
    }

    let result = '';
    const existProduct = warehouse.inventory.find(i => i.sku === sku);
    const existQty = existProduct ? existProduct.qty : 0;

    // Validate warehouse has product in inventory
    if (existQty === 0) {
        return 'Error: Warehouse does not have product in inventory';
    }

    // If unstock quantity equals inventory
    if (existQty === qty) {
        warehouse.inventory = warehouse.inventory.filter(i => i.sku !== sku);
    }
    // If unstock quantity exceeds inventory
    else if (existQty <= qty) {
        const shortage = qty - existQty;
        qty = qty - shortage;
        result = 'Warning: Warehouse inventory short by ' + shortage + ' units\n';
        warehouse.inventory = warehouse.inventory.filter(i => i.sku !== sku);
    } else {
        existProduct.qty = existQty - qty;
    }

    result = result + 'Unstocked ' + qty + ' ' + product.productName + ' from Warehouse ' + warehouse.warehouseNumber; 
    return result;
}

module.exports = unstock;