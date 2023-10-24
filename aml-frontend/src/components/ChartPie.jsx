import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label
} from "recharts";

const CustomLabel = ({ viewBox, value }) => {
  const { cx, cy } = viewBox;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="32"
        color="#002855"
        fontWeight={'800'}
      >
        {`${value}%`}
      </text>
    </g>
  );
};

function ChartPie({ data, colors, innerRadius, outerRadius }) {
  const total = data.reduce((total, item) => total + item.value, 0);

  const activePercentage = ((data[0].value / total) * 100).toFixed(0);

  return (
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="45%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
          <Label
            content={<CustomLabel value={activePercentage} />}
            position="center"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ChartPie;
