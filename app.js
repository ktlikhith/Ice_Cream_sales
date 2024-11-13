const fs = require('fs');

const data = fs.readFileSync('./sales_data.txt', 'utf-8').trim().split('\n');

const header = data.shift().split(',');

let totalSales = 0;
const monthWiseSales = {};
const monthWisePopularItems = {};
const monthWiseRevenueItems = {};
const monthWisePopularStats = {};

const getMonth = (date) => date.slice(0, 7);

data.forEach(line => {
    const [date, sku, unitPriceStr, quantityStr, totalPriceStr] = line.split(',');
    const month = getMonth(date);
    const unitPrice = parseInt(unitPriceStr);
    const quantity = parseInt(quantityStr);
    const totalPrice = parseInt(totalPriceStr);

   
    totalSales += totalPrice;

    if (!monthWiseSales[month]) monthWiseSales[month] = 0;
    monthWiseSales[month] += totalPrice;

    if (!monthWisePopularItems[month]) monthWisePopularItems[month] = {};
    if (!monthWiseRevenueItems[month]) monthWiseRevenueItems[month] = {};
 
    if (!monthWisePopularItems[month][sku]) monthWisePopularItems[month][sku] = 0;
    if (!monthWiseRevenueItems[month][sku]) monthWiseRevenueItems[month][sku] = 0;
    
    monthWisePopularItems[month][sku] += quantity;
    monthWiseRevenueItems[month][sku] += totalPrice;

    if (!monthWisePopularStats[month]) monthWisePopularStats[month] = {};
    if (!monthWisePopularStats[month][sku]) {
        monthWisePopularStats[month][sku] = {
            min: quantity,
            max: quantity,
            totalOrders: 0,
            totalQuantity: 0
        };
    }

    monthWisePopularStats[month][sku].min = Math.min(monthWisePopularStats[month][sku].min, quantity);
    monthWisePopularStats[month][sku].max = Math.max(monthWisePopularStats[month][sku].max, quantity);
    monthWisePopularStats[month][sku].totalOrders += 1;
    monthWisePopularStats[month][sku].totalQuantity += quantity;
});

console.log("Total Sales of the Store:", totalSales);
console.log("\nMonth-wise Sales Totals:");
for (const month in monthWiseSales) {
    console.log(`${month}: ${monthWiseSales[month]}`);
}

console.log("\nMonth-wise Most Popular Item and Item Generating Most Revenue:");
for (const month in monthWisePopularItems) {
    let popularItem = null, revenueItem = null;
    let maxQuantity = 0, maxRevenue = 0;

    for (const item in monthWisePopularItems[month]) {
        if (monthWisePopularItems[month][item] > maxQuantity) {
            maxQuantity = monthWisePopularItems[month][item];
            popularItem = item;
        }
        if (monthWiseRevenueItems[month][item] > maxRevenue) {
            maxRevenue = monthWiseRevenueItems[month][item];
            revenueItem = item;
        }
    }
    console.log(`${month} - Most Popular Item: ${popularItem} (${maxQuantity} units), Most Revenue Item: ${revenueItem} (₹${maxRevenue})`);
}

console.log("\nStatistics for the Most Popular Item Each Month:");
for (const month in monthWisePopularItems) {
    let mostPopularItem = null;
    let maxQuantitySold = 0;

    for (const item in monthWisePopularItems[month]) {
        if (monthWisePopularItems[month][item] > maxQuantitySold) {
            maxQuantitySold = monthWisePopularItems[month][item];
            mostPopularItem = item;
        }
    }

    const stats = monthWisePopularStats[month][mostPopularItem];
    const averageOrders = stats.totalQuantity / stats.totalOrders;
    console.log(`${month} - ${mostPopularItem}: Min Orders = ${stats.min}, Max Orders = ${stats.max}, Average Orders = ${averageOrders.toFixed(2)}`);
}
