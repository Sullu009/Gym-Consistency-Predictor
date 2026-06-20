import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function WorkoutChart({ workouts }) {
  const categoryCount = {};

  workouts.forEach((workout) => {
    categoryCount[workout.category] =
      (categoryCount[workout.category] || 0) + 1;
  });

  const data = Object.keys(categoryCount).map(
    (category) => ({
      name: category,
      value: categoryCount[category],
    })
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
  ];

  return (
    <div className="bg-white shadow-xl p-5 rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Workout Categories
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WorkoutChart;