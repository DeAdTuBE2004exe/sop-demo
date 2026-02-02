import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient(); // ✅ works in v6

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

const PORT = 5000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Database error", err);
  }
});
