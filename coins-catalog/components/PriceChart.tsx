import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceChartProps {
  data: { date: string; price: number }[];
}

export function PriceChart({ data }: PriceChartProps) {
  return (
    <ResponsiveContainer width="80%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8004d5" />
      </LineChart>
    </ResponsiveContainer>
  );
}
