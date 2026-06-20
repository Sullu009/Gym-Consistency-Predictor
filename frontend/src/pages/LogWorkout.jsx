import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function LogWorkout() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
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

  const saveWorkout = async () => {
    try {
      const newWorkout = {
        exercise,
        category,
        duration: Number(duration),
        date: new Date().toISOString().split("T")[0],
      };

      await axios.post(
        "http://localhost:5000/workouts",
        newWorkout
      );

      fetchWorkouts();

      setExercise("");
      setCategory("");
      setDuration("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWorkout = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/workouts/${id}`
    );

    fetchWorkouts();
  } catch (error) {
    console.log(error);
  }
};

  const clearAllWorkouts = () => {
    setWorkouts([]);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">
        Log Workout
      </h1>

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Dashboard
      </button>

      <div className="max-w-md">
        <input
          type="text"
          placeholder="Exercise Name"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">Select Category</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Cardio">Cardio</option>
        </select>

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={saveWorkout}
          className="bg-green-600 text-white px-5 py-3 rounded"
        >
          Save Workout
        </button>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Workout History
          </h2>

          <button
            onClick={clearAllWorkouts}
            className="bg-red-600 text-white px-4 py-2 rounded mb-4"
          >
            Clear All Workouts
          </button>

          {workouts.map((workout, index) => (
            <div
              key={index}
              className="border p-3 rounded mb-3"
            >
              <p>
                Exercise: {workout.exercise}
              </p>

              <p>
                Category: {workout.category}
              </p>

              <p>
                Duration: {workout.duration} mins
              </p>

              <p>
                Date: {workout.date}
              </p>

              <button
                onClick={() => deleteWorkout(workout._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogWorkout;