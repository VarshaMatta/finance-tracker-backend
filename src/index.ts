import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
// Make sure you've imported the auth router
import authRouter from "./routes/auth";
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3001;

// Use only one MongoDB connection - the local one
const mongoURI = process.env.MONGO_URI || "";
mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });


app.use(express.json());
app.use(cors());

// Routes
app.use("/financial-records", financialRecordRouter);
// Make sure you've registered the auth routes
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
