const Workout = require("./models/Workout");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

console.log("STARTING SERVER...");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://mdsultan80736_db_user:Sultan80736@ac-sbf3kyu-shard-00-00.cqyc80v.mongodb.net:27017,ac-sbf3kyu-shard-00-01.cqyc80v.mongodb.net:27017,ac-sbf3kyu-shard-00-02.cqyc80v.mongodb.net:27017/gymdb?ssl=true&replicaSet=atlas-lrwvrz-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.get("/", (req, res) => {
  res.send("SULTAN BACKEND 2026");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});
   
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend Healthy",
  });
});

app.post("/workouts", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/workouts", async (req, res) => {
  console.log("Workout API Hit");

  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.delete("/workouts/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);

    res.json({
      message: "Workout Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("END OF FILE");
