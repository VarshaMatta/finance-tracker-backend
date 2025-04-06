"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const financial_records_1 = __importDefault(require("./routes/financial-records"));
// Make sure you've imported the auth router
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Use only one MongoDB connection - the local one
mongoose_1.default
    .connect("mongodb://localhost:27017/finance-tracker")
    .then(() => {
    console.log("Connected to local MongoDB");
})
    .catch((err) => {
    console.error("Failed to Connect to MongoDB:", err);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/financial-records", financial_records_1.default);
// Make sure you've registered the auth routes
app.use("/auth", auth_1.default);
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
