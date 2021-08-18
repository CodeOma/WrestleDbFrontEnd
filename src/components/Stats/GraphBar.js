import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { Grid } from "@material-ui/core";
const ExampleChart = ({ tableData }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [style, setStyle] = useState({});
  useEffect(() => {
    if (!chartRef) return;
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: tableData.type,
      data: {
        labels: tableData.labels,
        datasets: [
          {
            label: [],
            data: tableData.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            yeet: [tableData.array],
          },
        ],
      },
      options: {
        // responsive: true,
        plugins: {
          //  legend: { labels: { padding: "20" } }
        },
        ...tableData.options,
        yeet: tableData.array,
      },
    });
    setMyChart(myChart);
  }, [chartRef]);
  useEffect(() => {
    if (!myChart) return;
    myChart.data.datasets[0].data = tableData.data;
    myChart.update();
  }, [tableData, myChart]);
  console.log(myChart?.legend?.legendItems);
  return (
    <Grid
      // onMouseOver={() => setStyle({ height: "100%" })}
      // onMouseOut={() => setStyle({ height: "auto", overflow: "hidden" })}
      container
      style={style}
    >
      {" "}
      <h6>{tableData.name || ""}</h6>
      <Grid
        container
        style={{ maxHeight: 75, overflow: "scroll" }}
        className='pb-2'
      >
        {myChart?.legend?.legendItems.length >= 1 &&
          myChart?.legend?.legendItems.map(item => {
            return (
              <li
                key={item.text}
                style={{
                  color: "#333",
                  fontSize: ".8rem",
                  listStyle: "none",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "row",
                  margin: "2px",
                }}
              >
                <div
                  style={{
                    marginRight: "5px",
                    width: "1.5rem",
                    height: "0.8rem",
                    backgroundColor: item.fillStyle,
                  }}
                />
                {item.text}
              </li>
            );
          })}
      </Grid>
      <canvas
        array={tableData}
        ref={chartRef}
        id='myChart'
        // width='500'
        // height='500'
      />
    </Grid>
  );
};

export default ExampleChart;
