const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description: "API documentation for Inventory Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    tags: [
      { name: "Products", description: "Product management APIs" },
      { name: "Suppliers", description: "Supplier management APIs" },
      { name: "Stock", description: "Stock operations" },
      { name: "Transactions", description: "Transaction history" },
      { name: "Alerts", description: "Low stock alerts" },
      { name: "Reports", description: "Inventory reports" },
      { name: "Auth", description: "Authentication APIs" }
    ]
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;