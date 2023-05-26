import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeoQuery } from "state/api";
import Header from "./Header.jsx";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/choropleth.js";

function Geo() {
  const theme = useTheme();
  const { data } = useGetGeoQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subTitle="Your users located" />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="5px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            // colors="nivo"
            domain={[0, 50]} //the range our data population, check our data for min/max per country
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={180} //zoom
            projectionTranslation={[0.4, 0.6]} //slide the map viewport
            projectionRotation={[0, 0, 0]}
            borderWidth={1}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: -40,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Geo;
