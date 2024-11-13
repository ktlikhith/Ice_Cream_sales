# Ice Cream Parlour Sales Data Analysis

This program analyzes sales data from an ice cream parlour. Given a `.txt` file containing sales information, it calculates and displays various metrics such as total sales, monthly sales totals, the most popular items, and other statistics for each month. This program uses basic JavaScript data structures to achieve the results without relying on external libraries.


## Requirements

- **Node.js**: This program is written in JavaScript and requires Node.js to run. You can download Node.js [here](https://nodejs.org/).

## Input File Format

`sales_data.txt` 

## Setup and Running the Program

1. **Clone or Download** the repository containing the program file and `sales_data.txt`.
2. **Install Node.js** (if you haven't already).
3. **Run the Program**:
   - Open a terminal and navigate to the directory containing `app.js` and `sales_data.txt`.
   - Execute the following command:
     
     node app.js
     

## Program Output

The program calculates and displays:

1. **Total Sales of the Store**: The overall revenue generated from all transactions.
2. **Month-wise Sales Totals**: The total revenue generated in each month.
3. **Most Popular Item**: The item with the highest quantity sold for each month.
4. **Item Generating Most Revenue**: The item with the highest revenue generated for each month.
5. **Statistics for the Most Popular Item**: For the most popular item in each month, the program displays:
   - Minimum quantity sold in a single transaction.
   - Maximum quantity sold in a single transaction.
   - Average quantity sold across all transactions.


## Example Output

Total Sales of the Store: 4583270

Month-wise Sales Totals:
2019-01: 1421330
2019-02: 1422350
2019-03: 1739590

Month-wise Most Popular Item and Item Generating Most Revenue:
2019-01 - Most Popular Item: Hot Chocolate Fudge (2673 units), Most Revenue Item: Hot Chocolate Fudge (₹320760)
2019-02 - Most Popular Item: Hot Chocolate Fudge (2636 units), Most Revenue Item: Hot Chocolate Fudge (₹316320)
2019-03 - Most Popular Item: Hot Chocolate Fudge (3100 units), Most Revenue Item: Hot Chocolate Fudge (₹372000)

Statistics for the Most Popular Item Each Month:
2019-01 - Hot Chocolate Fudge: Min Orders = 1, Max Orders = 5, Average Orders = 3.03
2019-02 - Hot Chocolate Fudge: Min Orders = 1, Max Orders = 5, Average Orders = 3.10
2019-03 - Hot Chocolate Fudge: Min Orders = 1, Max Orders = 5, Average Orders = 2.96
