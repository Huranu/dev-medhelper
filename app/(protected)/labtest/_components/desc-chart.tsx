"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HistoryRef } from "./prev-chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2b7fff",
  },
  mobile: {
    label: "Mobile",
    color: "#2b7fff",
  },
} satisfies ChartConfig;

const chartData = [
  {
    value: 8.86,
    unit: "10³/µL",
    date: "May",
  },
  {
    value: 7.86,
    unit: "10³/µL",
    date: "May",
  },
  {
    value: 6,
    unit: "10³/µL",
    date: "May",
  },
  {
    value: 9.02,
    unit: "10³/µL",
    date: "May",
  },
  {
    value: 3,
    unit: "10³/µL",
    date: "May",
  },
];

export function DescChart({ data }: { data: HistoryRef }) {
  const thresholdMax = data.refMax;
  const thresholdMin = data.refMin;

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>{data.labelMn}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                const isAboveThreshold = payload.value > thresholdMax || payload.value < thresholdMin;
                return (
                  <circle
                  key={`dot-${payload.value}`}
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={isAboveThreshold ? "red" : "#05df72"}
                    stroke="none"
                  />
                );
              }}
              activeDot={{
                r: 6,
                fill: "var(--color-desktop)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}