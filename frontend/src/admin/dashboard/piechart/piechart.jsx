import React, { Component } from "react";
import Chart from "react-google-charts";
import "./piechart.css";

function PieChart(props) {
  console.log(props.pieData);
if(!props.pieData){
  return<>null</>
}

  return (
    <div>
      <h1 className="heading">Your Stock</h1>
      <div  className="piechart">
      <Chart
        width={"50vw"}
        height={"50vw"}
        
       
    
        chartType="PieChart"
        loader={<div>Loading Pie Chart</div>}
        data={[
          ["Product", "stock"],
          ...props.pieData
        ]}
        options={{
          title: "Stock data",
          is3D: true,
        }}
      />
      </div>
      
    </div>
  );
}

export default PieChart;
