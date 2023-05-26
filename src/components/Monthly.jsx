import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "./Header";

import { useGetSalesQuery } from "state/api";
import { ResponsiveLine } from "@nivo/line";

function Monthly() {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
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

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesline.data = [
        ...totalSalesline.data,
        { x: month, y: totalSales },
      ];
      totalUnitLine.data = [...totalUnitLine.data, { x: month, y: totalUnits }];
    });

    const formattedData = [totalSalesline, totalUnitLine];
    return [formattedData];
  }, [data]);

  if (!data || isLoading) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Monthly sales" subTitle="chart of Monthly sales/unit" />
      <Box height="75vh">
        {data && formattedData[1].data.length > 1 ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: { line: { stroke: theme.palette.secondary[200] } },
              },
              legend: { text: { fill: theme.palette.secondary[200] } },
              ticks: {
                line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                text: { fill: theme.palette.secondary[700] },
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
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
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
            ]}
          />
        ) : (
          <>
            Data not found. Data only available for year: <b>2021</b>...
          </>
        )}
      </Box>
    </Box>
  );
}

export default Monthly;
