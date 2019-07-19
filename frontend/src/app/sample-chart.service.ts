import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleChartService {

  line_chart =
    {
      chartType : 'line',
      datasets : [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor : "fillPattern" },
        { data: [20, 87, 32, 80, 87, 10, 30], label: 'Series B' },
      ],
      datasetsCols : [],
      labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labelsCol : ['random', 'random'],
      options : {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio : 1.2,
        title : {
          display : true,
          text : 'Untitled Chart',
          fontSize : 20,
          fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontColor : '#666',
          fontStyle : 'bold'
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'x-axis',
                fontColor : '#666',
                fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize : 15,
                fontStyle : 'normal'
              },
              gridLines: {
                color: "rgba(0,0,0,0.1)",
                display : true,
                circular : false,
                lineWidth : 1,
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'y-axis',
                fontColor : '#666',
                fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize : 15,
                fontStyle : 'normal'
              },
              gridLines: {
                color: "rgba(0,0,0,0.1)",
                display : true,
                circular : false,
                lineWidth : 1,
              }
            }
          ]
        },
        legend : {
          labels : {
            fontColor : '#666666',
            fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize : 12,
            fontStyle : 'normal',
          },
          display : true,
          position : 'top',
        },
      },
      colors : [{
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },],
      legend : true,
      plugins : [],
      edited : false,
      cols : [],
  };

  bar_chart = 
  {
    chartType : 'bar',
    datasets : [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ],
    datasetsCols : [],
    labelsCol : 'random_now',
    labels : ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    options : {
      responsive: true,
      aspectRatio : 1.2,
    },
    plugins : [],
    legend : true,
    edited : false,
    cols : [],
  };

  doughnut_chart = {
    chartType : 'doughnut',
    data : [
      [350, 450, 100],
      [50, 150, 120],
      [250, 130, 70],
    ],
    labels : ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    labelsCol : 'random_now',
    dataCols : [],
    legend : true,
    plugins : [],
    options : {aspectRatio : 1.2,},
    edited : false,
    cols : [],
  };

  radar_chart = {
    datasets : [
      { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ],
    datasetsCols : [],
    labelsCol : 'random_now',
    options : {
      responsive: true,
      aspectRatio : 1.2,
    },
    labels : ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    chartType : 'radar',
    legend : true,
    plugins : [],
    edited : false,
    cols : [],
  };

  pie_chart = {
    data : [300, 500, 100],
    dataCol : 'random_now',
    labelsCol : 'random_now',
    labels : [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    chartType : 'pie',
    options : {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      },
      aspectRatio : 1.2,
    },
    plugins : [],
    colors : [
      
    ],
    legend : true,
    edited : false,
  };

  polar_chart = {
    data : [300, 500, 100, 40, 120],
    dataCol : 'random_now',
    labelsCol : 'random_now',
    labels : ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
    chartType : 'polarArea',
    legend : true,
    plugins : [],
    options : {
      aspectRatio : 1.2,
    },
    colors : [],
    edited : false,
    cols : [],
  };

  bubble_chart = {
    datasets : [
      {
        data: [
          { x: 10, y: -10, r: 10 },
          { x: 15, y: 5, r: 15 },
          { x: 26, y: 12, r: 23 },
          { x: 7, y: 8, r: 8 },
        ],
        
        label: 'Series A',
        backgroundColor: 'purple',
        borderColor: 'blue',
        hoverBackgroundColor: 'purple',
        hoverBorderColor: 'red',
      },
    ],
    options : {
      title : {
        display : true,
        text : 'Untitled Chart',
        fontSize : 20,
        fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontColor : '#666',
        fontStyle : 'bold'
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              min: 0,
              max: 30,
            },
            scaleLabel: {
              display: true,
              labelString: 'x-axis',
              fontColor : '#666',
              fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize : 15,
              fontStyle : 'normal'
            },
            gridLines: {
              color: "rgba(0,0,0,0.1)",
              display : true,
              circular : false,
              lineWidth : 1,
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 30,              
            },
            scaleLabel: {
              display: true,
              labelString: 'y-axis',
              fontColor : '#666',
              fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              fontSize : 15,
              fontStyle : 'normal'
            },
            gridLines: {
              color: "rgba(0,0,0,0.1)",
              display : true,
              circular : false,
              lineWidth : 1,
            }
          }
        ]
      },
      legend : {
        labels : {
          fontColor : '#666666',
          fontFamily : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          fontSize : 12,
          fontStyle : 'normal',
        },
        display : true,
        position : 'top',
      },
      aspectRatio : 1.2,
    },
    colors : [
      {
        backgroundColor: [
          'red',
          'green',
          'blue',
          'purple',
          'yellow',
          'brown',
          'magenta',
          'cyan',
          'orange',
          'pink'
        ]
      }
    ],
    legend : true,
    chartType : 'bubble',
    plugins : [],
    edited : false,
    cols : [],
  };

  scatter_chart = {
    datasets : [
      {
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 3 },
          { x: 3, y: -2 },
          { x: 5, y: -3 },
        ],
        label: 'Series A',
        pointRadius: 10,
      },
    ],
    options : {
      responsive: true,
      aspectRatio : 1.2,
    },
    labels : ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    chartType : 'scatter',
    legend : true,
    plugins : [],
    edited : false,
    cols : [],
  };

  constructor() { }
}
