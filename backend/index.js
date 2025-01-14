const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
// const paymentRoute = require("./routes/payments"); // Ensure this path is correct

const app = express();
const port = 4000;

app.use('/upload', express.static(path.join(__dirname, 'upload')));

// Load environment variables from .env file
require("dotenv").config();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173","*"], 
        methods: ["POST", "GET", "UPLOAD"],
        credentials: true,
    })
);

// app.use("/api/payment/", paymentRoute);

// Database connection with MongoDB
mongoose
    .connect(process.env.ATLAS_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });

// API creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Schema for Creating Products
const Product = mongoose.model("product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API For deleting Products
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API For getting all Products

app.get('/allproducts', async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        console.log(searchQuery);
        let products;

        if (searchQuery) {
            products = await Product.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { category: { $regex: searchQuery, $options: 'i' } },
                ]
            });
        } else {
            products = await Product.find({});
        }

        console.log("Products Fetched");
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred while fetching products.' });
    }
});
// Schema creating for user model
const Users = mongoose.model("Users", {
    name: {
        type: "string",
    },
    email: {
        type: "string",
        unique: true,
    },
    password: {
        type: "string",
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing user found with same email address",
        });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: { id: user.id },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
});

// Creating endpoint for user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        } else {
            res.json({
                success: false,
                errors: "Wrong password",
            });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});

// Creating endpoint for new collection data
app.get("/newcollection", async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection);
});

// Creating endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(1).slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
});

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({
            errors: "Please authenticate using valid token",
        });
    } else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({
                errors: "Please authenticate using a valid token",
            });
        }
    }
};

// Creating endpoint for adding products to cart data
app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("Added ", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    );

    res.send("Added");
});

// Creating endpoint to remove products from cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("Removed ", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    );
    res.send("Removed");
});

// Creating endpoint for fetching cart data of a user
app.get("/cartdata", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });
    res.send(user.cartData);
});

// Creating endpoint for fetching user data
app.get("/userdata", fetchUser, async (req, res) => {
    let user = await Users.findOne({ _id: req.user.id });
    res.send(user);
});

// Listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
