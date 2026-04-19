const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

exports.getInventorySummary = async () => {
  const products = await Product.find();

  const totalProducts = products.length;
  
  const totalQuantity = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * p.quantity),
    0
  );

  const lowStockCount = products.filter(p => p.quantity < p.minStock).length;

  return {
    totalProducts,
    totalQuantity,
    totalValue,
    lowStockCount
  };
};

exports.getLowStockProducts = async () => {
  return await Product.find({
    $expr: { $lt: ["$quantity", "$minStock"] }
  });
};

exports.getTotalInventoryValue = async () => {
  const products = await Product.find();

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return { totalValue };
};

exports.getInventoryTrends = async (req, res) => {
  try {
    const { startDate, endDate, days = 30 } = req.query;
    
    let fromDate, toDate;

    if (startDate && endDate) {
      // Custom date range
      fromDate = new Date(startDate);
      toDate = new Date(endDate);
      toDate.setHours(23, 59, 59, 999);
    } else {
      // Default: last N days
      toDate = new Date();
      toDate.setHours(23, 59, 59, 999);
      fromDate = new Date(toDate);
      fromDate.setDate(toDate.getDate() - parseInt(days) + 1);
      fromDate.setHours(0, 0, 0, 0);
    }

    const results = await Transaction.aggregate([
      {
        $match: {
          date: { $gte: fromDate, $lte: toDate }
        }
      },
      {
        $project: {
          type: 1,
          quantity: 1,
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date"
            }
          }
        }
      },
      {
        $group: {
          _id: "$day",
          totalIn: {
            $sum: {
              $cond: [{ $eq: ["$type", "IN"] }, "$quantity", 0]
            }
          },
          totalOut: {
            $sum: {
              $cond: [{ $eq: ["$type", "OUT"] }, "$quantity", 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    return results.map((item) => ({
      date: item._id,
      totalIn: item.totalIn,
      totalOut: item.totalOut
    }));
  } catch (error) {
    throw error;
  }
};

exports.getTransactionHistory = async () => {
  return await Transaction.find().populate("productID");
};

exports.getMonthlyTrends = async () => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setMonth(today.getMonth() - 11);
  fromDate.setDate(1);
  fromDate.setHours(0, 0, 0, 0);

  const results = await Transaction.aggregate([
    {
      $match: {
        date: { $gte: fromDate }
      }
    },
    {
      $project: {
        type: 1,
        quantity: 1,
        month: {
          $dateToString: {
            format: "%Y-%m",
            date: "$date"
          }
        }
      }
    },
    {
      $group: {
        _id: "$month",
        totalIn: {
          $sum: {
            $cond: [{ $eq: ["$type", "IN"] }, "$quantity", 0]
          }
        },
        totalOut: {
          $sum: {
            $cond: [{ $eq: ["$type", "OUT"] }, "$quantity", 0]
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return results.map((item) => ({
    month: item._id,
    totalIn: item.totalIn,
    totalOut: item.totalOut
  }));
};

exports.getProductTrends = async (productId) => {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 29);
  fromDate.setHours(0, 0, 0, 0);

  const results = await Transaction.aggregate([
    {
      $match: {
        productID: require("mongoose").Types.ObjectId(productId),
        date: { $gte: fromDate }
      }
    },
    {
      $project: {
        type: 1,
        quantity: 1,
        day: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$date"
          }
        }
      }
    },
    {
      $group: {
        _id: "$day",
        totalIn: {
          $sum: {
            $cond: [{ $eq: ["$type", "IN"] }, "$quantity", 0]
          }
        },
        totalOut: {
          $sum: {
            $cond: [{ $eq: ["$type", "OUT"] }, "$quantity", 0]
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return results.map((item) => ({
    date: item._id,
    totalIn: item.totalIn,
    totalOut: item.totalOut
  }));
};
