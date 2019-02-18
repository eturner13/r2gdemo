const stock = (cmd, store) => {
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

    const invTotal = warehouse.inventory.reduce((a, i) => {return a + i.qty}, 0);
    const limit = warehouse.limit;
    const space = limit - invTotal;

    // Determine if warehouse is full
    if (limit !== 0 && !space > 0) {
        return 'Error: Warehouse ' + warehouseNumber + ' has no inventory space';
    }
    
    let result = '';
    const existProduct = warehouse.inventory.find(i => i.sku === sku); // Determine if product already in inventory
    let existQty = existProduct ? existProduct.qty : 0; // Determine amount already stocked if any

    // If stock quantity exceeds inventory remaining space
    if (limit !== 0 && qty > space) {
        const excess = qty - space;
        qty = qty - excess;
        result = 'Warning: Warehouse space would be exceeded by ' + excess + ' units\n';
    }

    // If product already exists in warehouse
    if (existProduct) {
        existProduct.qty = existQty + qty;
    }
    // If product does not yet exist in warehouse
    else {
        warehouse.inventory.push({
            sku: sku,
            qty: qty
        })
    }

    result = result + 'Stocked ' + qty + ' ' + product.productName + ' in Warehouse ' + warehouse.warehouseNumber; 
    return result;
}

module.exports = stock;