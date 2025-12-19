require("dotenv").config({ quiet: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 1. Ket noi MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("MongoDB Error:", err));
}

// 2. Dinh nghia Model User (Schema)
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", userSchema);

// 3. Cac API Router
// Trang chu: Kiem tra trang thai
app.get("/", (req, res) => {
    res.status(200).send("Backend deployed on Render successfully!");
});

// Lay danh sach User
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tao User moi (Dung de them du lieu)
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API phu: Tao du lieu mau (Chay 1 lan de co data hien thi)
app.get("/seed", async (req, res) => {
    try {
        await User.create([
            { name: "Nguyen Van A", email: "a@gmail.com" },
            { name: "Tran Thi B", email: "b@example.com" },
            { name: "Le Van C", email: "c@test.io" }
        ]);
        res.send("Da tao 3 user mau thanh cong! Hay quay lai Frontend refresh.");
    } catch (err) {
        res.send("Loi tao data: " + err.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});