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
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const router = express_1.default.Router();
const getAllByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const financialRecords = yield financial_record_1.default.find({ userId }).exec();
        res.json(financialRecords || []);
    }
    catch (err) {
        console.error("Error fetching records:", err);
        res.status(500).json({ error: "Failed to fetch records", records: [] });
    }
});
router.get("/getAllByUserID/:userId", getAllByUserID);
const updateRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = yield financial_record_1.default.findByIdAndUpdate(id, newRecordBody, { new: true });
        if (!record) {
            res.status(404).send();
            return;
        }
        res.status(200).send(record);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const record = yield financial_record_1.default.findByIdAndDelete(id);
        if (!record) {
            res.status(404).send();
            return;
        }
        res.status(200).send(record);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const createRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recordData = req.body;
        const newRecord = new financial_record_1.default(recordData);
        yield newRecord.save();
        res.status(201).json(newRecord);
    }
    catch (err) {
        console.error("Error creating record:", err);
        res.status(500).json({ error: "Failed to create record" });
    }
});
router.post("/", createRecord);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
exports.default = router;
