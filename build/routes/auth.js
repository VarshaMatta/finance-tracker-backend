"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../schema/user"));
const router = express_1.default.Router();
// Login user function
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid username or password" });
            return;
        }
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email
        };
        res.status(200).json(userResponse);
    }
    catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Failed to login" });
    }
});
// Get user profile function
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_1.default.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ error: "Failed to fetch user profile" });
    }
});
// Register user function
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const existingUser = yield user_1.default.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            res.status(400).json({
                error: "User already exists with this username or email"
            });
            return;
        }
        const newUser = new user_1.default({
            username,
            password,
            email
        });
        yield newUser.save();
        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };
        res.status(201).json(userResponse);
    }
    catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Failed to register user" });
    }
});
// Register routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getUserProfile);
exports.default = router;
