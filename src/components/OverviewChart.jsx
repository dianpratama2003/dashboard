import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

function OverviewChart({ isDashboardView = false, view }) {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  const [totalSalesline, totalUnitLine] = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data;

    //format that nivo line requires
    const totalSalesline = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    const totalUnitLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        //appending new object to the the item returned of useMemo
        totalSalesline.data = [
          ...totalSalesline.data,
          { x: month, y: curSales },
        ];
        totalUnitLine.data = [...totalUnitLine.data, { x: month, y: curUnits }];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );
    return [[totalSalesline], [totalUnitLine]];
  }, [data]);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={view == "sales" ? totalSalesline : totalUnitLine}
      theme={{
        axis: {
          domain: { line: { stroke: theme.palette.secondary[200] } },
        },
        legend: { text: { fill: theme.palette.secondary[200] } },
        ticks: {
          line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
          text: { fill: theme.palette.secondary[200] },
        },
        legends: { text: { fill: theme.palette.secondary[200] } },
        tooltip: { container: { color: theme.palette.primary.main } },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboardView}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboardView) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboardView ? "" : "month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        isDashboardView
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
}

export default OverviewChart;
