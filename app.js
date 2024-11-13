const fs = require('fs');

// Read data from the file
const data = fs.readFileSync('./sales_data.txt', 'utf-8').trim().split('\n');

// Parse the header and remove it from the data
const header = data.shift().split(',');

// Initialize variables for storing results
let totalSales = 0;
const monthWiseSales = {};
const monthWisePopularItems = {};
const monthWiseRevenueItems = {};
const monthWisePopularStats = {};

// Helper function to extract the month in 'YYYY-MM' format from date string
const getMonth = (date) => date.slice(0, 7);

// Process each record in the data
data.forEach(line => {
    const [date, sku, unitPriceStr, quantityStr, totalPriceStr] = line.split(',');
    const month = getMonth(date);
    const unitPrice = parseInt(unitPriceStr);
    const quantity = parseInt(quantityStr);
    const totalPrice = parseInt(totalPriceStr);

    // Update total sales
    totalSales += totalPrice;

    // Update month-wise sales totals
    if (!monthWiseSales[month]) monthWiseSales[month] = 0;
    monthWiseSales[month] += totalPrice;

    // Update item popularity (by quantity sold) and revenue generation (by total revenue) for each month
    if (!monthWisePopularItems[month]) monthWisePopularItems[month] = {};
    if (!monthWiseRevenueItems[month]) monthWiseRevenueItems[month] = {};
    
    // Initialize entries if they don't exist
    if (!monthWisePopularItems[month][sku]) monthWisePopularItems[month][sku] = 0;
    if (!monthWiseRevenueItems[month][sku]) monthWiseRevenueItems[month][sku] = 0;
    
    monthWisePopularItems[month][sku] += quantity;
    monthWiseRevenueItems[month][sku] += totalPrice;

    // Update min, max, and average stats for the most popular item
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

// Calculate and print results
console.log("Total Sales of the Store:", totalSales);

// Month-wise total sales
console.log("\nMonth-wise Sales Totals:");
for (const month in monthWiseSales) {
    console.log(`${month}: ${monthWiseSales[month]}`);
}

// Month-wise most popular item and item generating most revenue
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

// Month-wise statistics for the most popular item
console.log("\nStatistics for the Most Popular Item Each Month:");
for (const month in monthWisePopularItems) {
    let mostPopularItem = null;
    let maxQuantitySold = 0;

    // Find the most popular item in the month
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
