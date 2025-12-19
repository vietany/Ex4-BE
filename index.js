require("dotenv").config({ quiet: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Backend deployed on Render successfully!");
});

const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
    mongoose
        .connect(MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("MongoDB Error:", err));
} else {
    console.log("No MONGO_URI provided in .env");
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});