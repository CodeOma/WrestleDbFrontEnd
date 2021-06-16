import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import { Grid } from "@material-ui/core";
const ExampleChart = ({ tableData }) => {
  const chartRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!chartRef) return;

    const d1 = tableData.data1;
    const d2 = tableData.data2;

    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: tableData.labels,
        datasets: [
          {
            label: "Scored",
            data: d1,
            datasetIndex: 0,
            backgroundColor: [
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

          {
            label: "Given Up",
            data: d2,
            datasetIndex: 1,
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
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
        // responsive: true,

        ...tableData.options,
        // yeet: tableData.array,
        // scales: {
        //   x: {
        //     stacked: true,
        //   },
        //   y: {
        //     stacked: true,
        //   },
        // },
      },
    });
    setMyChart(myChart);
  }, [chartRef]);
  // useEffect(() => {
  //   if (!myChart) return;
  //   // console.log(myChart.data.datasets.data);
  //   // myChart.data.datasets.data = [tableData.data1, tableData.data2];
  //   myChart.update();
  // }, [tableData, myChart]);
  return (
    <>
      {" "}
      <h6>Score/Conceded per td</h6>
      <Grid container>
        {myChart?.legend?.legendItems.length &&
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
                  margin: "8px",
                }}
              >
                <div
                  style={{
                    marginRight: "8px",
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
    </>
  );
};

export default ExampleChart;
