"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const financialRecordSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, default: "Cash" },
}, {
    timestamps: true // Add timestamps for created and updated
});
const FinancialRecordModel = mongoose_1.default.model("FinancialRecord", financialRecordSchema);
exports.default = FinancialRecordModel;
