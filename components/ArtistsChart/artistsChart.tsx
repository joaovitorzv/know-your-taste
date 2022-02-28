import { useTopItems } from "hooks/swr/useTopItems";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import artistsChart from "./artistsChart.module.scss";

const ArtistsChart = () => {
  const { data } = useTopItems("topArtists");
  ("some string");

  const [artistsChartData, setArtistsChartData] = useState<
    { name: string; popularity: number }[]
  >([]);

  if (data && artistsChartData.length === 0) {
    data.items.map((artist: any) =>
      setArtistsChartData((prev) => [
        ...prev,
        { name: artist.name, popularity: artist.popularity },
      ])
    );
  }
  return (
    <div className={artistsChart.container}>
      <BarChart
        layout="vertical"
        width={600}
        height={300}
        data={artistsChartData}
        margin={{ left: 30 }}
      >
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" dataKey="popularity" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar barSize={20} dataKey="popularity" fill="#363636" />
      </BarChart>
    </div>
  );
};

export default ArtistsChart;
