import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "./Header";

import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from "@nivo/line";

function Daily() {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;

    //format that nivo line requires
    const totalSalesline = {
      id: "totalSales",
      color: theme.palette.primary[600],
      data: [],
    };

    const totalUnitLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);
        totalSalesline.data = [
          ...totalSalesline.data,
          { x: splitDate, y: totalSales },
        ];
        totalUnitLine.data = [
          ...totalUnitLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesline, totalUnitLine];
    return [formattedData];
  }, [data, startDate, endDate]);

  if (!data || isLoading) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Daily sales" subTitle="chart of daily sales/unit" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectStart
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>
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
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "month",
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

export default Daily;
