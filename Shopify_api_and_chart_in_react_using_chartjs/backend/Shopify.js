import express from "express";
import mongoose from "mongoose";

import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.CORS||' http://localhost:5173', // Allow requests from your frontend
  methods: 'GET,POST,PUT,DELETE',  // Allow specific HTTP methods
  credentials: true,               // Allow cookies to be sent if needed
}));

app.use(express.json());

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI ;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Mongoose Model
const ShopifyOrderSchema = new mongoose.Schema({}, { strict: false }); // Use strict: false for dynamic schema
const ShopifyOrder = mongoose.model(
  "ShopifyOrder",
  ShopifyOrderSchema,
  "shopifyOrders"
);

const ShopifyCustomerSchema = new mongoose.Schema({}, { strict: false }); // Use strict: false for dynamic schema
const ShopifyCustomer = mongoose.model(
  "ShopifyCustomer",
  ShopifyCustomerSchema,
  "shopifyCustomers"
);

// Routes
// 1.Total Sales
app.get("/api/analytics/total-sales", async (req, res) => {
  const interval = req.query.interval || "daily";
  let groupId;

  if (interval === "daily") {
    groupId = {
      day: { $dayOfMonth: { $toDate: "$created_at" } },
      month: { $month: { $toDate: "$created_at" } },
      year: { $year: { $toDate: "$created_at" } },
    };
  } else if (interval === "monthly") {
    groupId = {
      month: { $month: { $toDate: "$created_at" } },
      year: { $year: { $toDate: "$created_at" } },
    };
  } else if (interval === "quarterly") {
    groupId = {
      quarter: {
        $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] },
      },
      year: { $year: { $toDate: "$created_at" } },
    };
  } else if (interval === "yearly") {
    groupId = { year: { $year: { $toDate: "$created_at" } } };
  } else {
    return res.status(400).json({ error: "Invalid interval parameter" });
  }

  try {
    const salesData = await ShopifyOrder.aggregate([
      {
        $group: {
          _id: groupId,
          totalSales: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    res.json(salesData);
  } catch (err) {
    console.error("Aggregation error:", err);
    res.status(500).json({ error: "Failed to fetch total sales data" });
  }
});

// 2. Sales Growth Rate API
app.get("/api/analytics/sales-growth", async (req, res) => {
    const interval = req.query.interval || "daily";
    let groupId;
  
    if (interval === "daily") {
      groupId = {
        day: { $dayOfMonth: { $toDate: "$created_at" } },
        month: { $month: { $toDate: "$created_at" } },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === "monthly") {
      groupId = {
        month: { $month: { $toDate: "$created_at" } },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === "quarterly") {
      groupId = {
        quarter: {
          $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] },
        },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === "yearly") {
      groupId = { year: { $year: { $toDate: "$created_at" } } };
    }
  
    try {
      const salesData = await ShopifyOrder.aggregate([
        {
          $group: {
            _id: groupId,
            totalSales: {
              $sum: { $toDouble: "$total_price_set.shop_money.amount" },
            },
          },
        },
        { 
          $sort: { 
            "_id.year": 1, 
            "_id.month": 1, 
            "_id.day": 1 
          } 
        },
        {
          $setWindowFields: {
            sortBy: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
            output: {
              previousTotalSales: {
                $shift: {
                  output: "$totalSales",
                  by: -1
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 1,
            totalSales: 1,
            growthRate: {
              $cond: {
                if: { $eq: ["$previousTotalSales", 0] },
                then: 0,
                else: {
                  $multiply: [
                    {
                      $divide: [
                        { $subtract: ["$totalSales", "$previousTotalSales"] },
                        "$previousTotalSales"
                      ]
                    },
                    100
                  ]
                }
              }
            }
          }
        }
      ]);
  
      res.json(salesData);
    } catch (err) {
      console.error("Error fetching sales growth rate data:", err);
      res.status(500).json({ error: "Failed to fetch sales growth rate data" });
    }
  });

  // 3. New Customers Added Over Time
app.get('/api/analytics/new-customers', async (req, res) => {
    const interval = req.query.interval || 'daily';
    let groupId;
  
    // Define grouping ID based on the interval
    if (interval === 'daily') {
      groupId = {
        day: { $dayOfMonth: { $toDate: "$created_at" } },
        month: { $month: { $toDate: "$created_at" } },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === 'monthly') {
      groupId = {
        month: { $month: { $toDate: "$created_at" } },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === 'quarterly') {
      groupId = {
        quarter: {
          $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] },
        },
        year: { $year: { $toDate: "$created_at" } },
      };
    } else if (interval === 'yearly') {
      groupId = { year: { $year: { $toDate: "$created_at" } } };
    } else {
      return res.status(400).json({ error: 'Invalid interval parameter' });
    }
  
    try {
      const newCustomersData = await ShopifyCustomer.aggregate([
        {
          $group: {
            _id: groupId,
            newCustomers: { $sum: 1 }, // Count each new customer
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
            "_id.day": 1,
          },
        },
      ]);
  
      res.json(newCustomersData);
    } catch (err) {
      console.error('Error fetching new customers data:', err);
      res.status(500).json({ error: 'Failed to fetch new customers data' });
    }
  });

//   4.repeat-customer
app.get('/api/analytics/repeat-customers', async (req, res) => {
    const interval = req.query.interval || 'daily';
    let groupId;

    // Define grouping ID based on the interval
    if (interval === 'daily') {
        groupId = {
          day: { $dayOfMonth: { $toDate: "$created_at" } },
          month: { $month: { $toDate: "$created_at" } },
          year: { $year: { $toDate: "$created_at" } }
        };
    } else if (interval === 'monthly') {
        groupId = {
          month: { $month: { $toDate: "$created_at" } },
          year: { $year: { $toDate: "$created_at" } }
        };
    } else if (interval === 'quarterly') {
        groupId = {
          quarter: {
            $ceil: { $divide: [{ $month: { $toDate: "$created_at" } }, 3] }
          },
          year: { $year: { $toDate: "$created_at" } }
        };
    } else if (interval === 'yearly') {
        groupId = { year: { $year: { $toDate: "$created_at" } } };
    } else {
        return res.status(400).json({ error: 'Invalid interval parameter' });
    }

    try {
      const repeatCustomersData = await ShopifyOrder.aggregate([
        {
          $lookup: {
            from: 'shopifyCustomers', // Join with shopifyCustomers collection
            localField: 'customer.id',
            foreignField: 'id',
            as: 'customerDetails'
          }
        },
        {
          $unwind: '$customerDetails' // Unwind to deconstruct the array
        },
        {
          $group: {
            _id: '$customer.id', // Group by customer ID
            orderCount: { $sum: 1 } // Count the number of orders per customer
          }
        },
        {
          $match: {
            orderCount: { $gt: 1 } // Keep only customers with more than 1 order
          }
        },
        {
          $lookup: {
            from: 'shopifyCustomers', // Join again to get customer creation date
            localField: '_id',
            foreignField: 'id',
            as: 'customerData'
          }
        },
        {
          $unwind: '$customerData' // Unwind to deconstruct the array
        },
        {
          $addFields: {
            created_at: { $toDate: "$customerData.created_at" } // Convert to date type
          }
        },
        {
          $group: {
            _id: groupId, // Group by the specified time interval
            repeatCustomers: { $sum: 1 } // Count the number of repeat customers
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
            "_id.day": 1,
          }
        }
      ]);

      res.json(repeatCustomersData);
    } catch (err) {
      console.error('Error fetching repeat customers data:', err);
      res.status(500).json({ error: 'Failed to fetch repeat customers data' });
    }
});

// 5. Geographical Distribution of Customers
app.get('/api/analytics/geo-distribution', async (req, res) => {
    try {
      const geoData = await ShopifyCustomer.aggregate([
        {
          $group: {
            _id: '$default_address.city', // Group by city
            customerCount: { $sum: 1 },   // Count the number of customers per city
          },
        },
        { $sort: { customerCount: -1 } } // Sort by customer count in descending order
      ]);
  
      res.json(geoData);
    } catch (err) {
      console.error('Error fetching geographical distribution data:', err);
      res.status(500).json({ error: 'Failed to fetch geographical distribution data' });
    }
  });
  
  
  

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
