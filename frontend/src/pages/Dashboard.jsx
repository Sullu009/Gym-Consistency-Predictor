import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import WorkoutChart from "../components/WorkoutChart";

function Dashboard() {
const [workouts, setWorkouts] = useState([]);

const fetchWorkouts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/workouts"
    );

    setWorkouts(res.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchWorkouts();
}, []);

const navigate = useNavigate();

const [darkMode, setDarkMode] = useState(false);

const totalWorkouts = workouts.length;

const uniqueDates = [
...new Set(workouts.map((workout) => workout.date))
];

const currentStreak = uniqueDates.length;

const totalMinutes = workouts.reduce(
(sum, workout) =>
sum + Number(workout.duration),
0
);

let riskScore = 100;

if (totalWorkouts >= 5) {
riskScore = 10;
} else if (totalWorkouts >= 4) {
riskScore = 20;
} else if (totalWorkouts >= 3) {
riskScore = 40;
} else if (totalWorkouts >= 2) {
riskScore = 60;
} else if (totalWorkouts >= 1) {
riskScore = 80;
}

const weeklyGoal = 5;

const weeklyCompletion = Math.min(
Math.round((totalWorkouts / weeklyGoal) * 100),
100
);

return (
<div
className={`min-h-screen p-10 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
> <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl mb-8 shadow-xl"> <h1 className="text-4xl font-bold">
🏋️ Gym Consistency Predictor </h1>


    <p className="mt-2 text-lg">
      Track your workouts and stay consistent.
    </p>
  </div>

  <div className="flex gap-4 mb-8 flex-wrap">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-gray-800 text-white px-5 py-3 rounded-xl"
    >
      {darkMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode"}
    </button>

    <button
      onClick={() => navigate("/log-workout")}
      className="bg-black text-white px-5 py-3 rounded-xl"
    >
      Log Workout
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

    <div
      className={`shadow-xl p-5 rounded-2xl hover:scale-105 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2
        className={`font-bold ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        📅 Current Streak
      </h2>

      <p className="text-3xl font-bold mt-2">
        {currentStreak} Days
      </p>
    </div>

    <div
      className={`shadow-xl p-5 rounded-2xl hover:scale-105 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2
        className={`font-bold ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        ⏱ Total Minutes
      </h2>

      <p className="text-3xl font-bold mt-2">
        {totalMinutes}
      </p>
    </div>

    <div
      className={`shadow-xl p-5 rounded-2xl hover:scale-105 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2
        className={`font-bold ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        💪 Total Workouts
      </h2>

      <p className="text-3xl font-bold mt-2">
        {totalWorkouts}
      </p>
    </div>

    <div
      className={`shadow-xl p-5 rounded-2xl hover:scale-105 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2
        className={`font-bold ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        🔥 Risk Score
      </h2>

      <p className="text-3xl font-bold mt-2 text-red-500">
        {riskScore}
      </p>
    </div>

    <div
      className={`shadow-xl p-5 rounded-2xl hover:scale-105 transition ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2
        className={`font-bold ${
  darkMode
    ? "text-gray-300"
    : "text-gray-600"
}`}
      >
        📈 Weekly Completion
      </h2>

      <p className="text-3xl font-bold mt-2">
        {weeklyCompletion}%
      </p>

      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
  <div
    className="bg-green-500 h-4 rounded-full"
    style={{
      width: `${weeklyCompletion}%`,
    }}
  ></div>
</div>
    </div>

  </div>

  <WorkoutChart workouts={workouts} />
</div>

);
}

export default Dashboard;

