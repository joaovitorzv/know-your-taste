import * as Info from "components/Popover/popover";
import { useTopItems } from "hooks/swr/useTopItems";
import { useState } from "react";
import { MdInfo as InfoIcon } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import artistsChart from "./artistsChart.module.scss";

const ArtistsChart = () => {
  const { data, isLoading } = useTopItems("topArtists");

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

  if (isLoading)
    return (
      <div className={artistsChart.container}>
        <header>
          <h2>Popularidade</h2>
        </header>
        <div className={artistsChart.chart}>
          <Skeleton count={5} height={30} style={{ marginTop: "1em" }} />
        </div>
      </div>
    );

  return (
    <div className={artistsChart.container}>
      <header>
        <h2>Popularidade</h2>

        <Info.Pophover>
          <Info.Popover>
            <span>Popularidade</span>
            <p>
              Popularidade (de 0 a 100) dos seus artistas favoritos em todo o
              spotify.
            </p>
          </Info.Popover>

          <Info.Popicon>
            <InfoIcon size={18} />
          </Info.Popicon>
        </Info.Pophover>
      </header>
      <div className={artistsChart.chart}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            width={600}
            height={300}
            data={artistsChartData}
            margin={{ left: 20 }}
          >
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "var(--primary-semidark)" }}
              tickLine={{ fill: "red", color: "blue" }}
            />
            <XAxis
              type="number"
              dataKey="popularity"
              tick={{ fill: "var(--primary-semidark)" }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              separator=" ~"
              itemStyle={{
                color: "var(--primary-dark)",
              }}
              labelStyle={{
                color: "var(--secondary-main)",
              }}
              contentStyle={{
                border: "2px solid var(--primary-dark)",
                borderRadius: "8px",
              }}
              cursor={{
                strokeWidth: 0,
                fill: "var(--primary-semilight)",
              }}
            />
            <Bar
              barSize={20}
              dataKey="popularity"
              fill="var(--primary-semidark)"
              label={{ fill: "var(--secondary-light)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ArtistsChart;
