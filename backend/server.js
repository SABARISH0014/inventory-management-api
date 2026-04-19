require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: '*' // Change this to your Vercel domain later for security
}));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});