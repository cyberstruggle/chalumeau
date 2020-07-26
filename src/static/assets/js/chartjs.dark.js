$.exists = function(selector) {
  return $(selector).length > 0;
};

var lineChartToolTips = {
  displayColors: false,
  mode: "nearest",
  intersect: false,
  position: "nearest",
  xPadding: 8,
  yPadding: 8,
  caretPadding: 8,
  backgroundColor: "#1D1F3C",
  cornerRadius: 4,
  titleFontSize: 13,
  titleFontStyle: "normal",
  bodyFontSize: 13,
  titleFontColor: "rgba(255, 255, 255, 0.8)",
  bodyFontColor: "rgba(255, 255, 255, 0.6)",
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.08)"
}
var scalesYaxes = [{
  ticks: {
    fontSize: 14,
    fontColor: "rgba(255, 255, 255, 0.4)",
    padding: 15,
    beginAtZero: true,
    autoSkip: false,
    maxTicksLimit: 4
  },
  gridLines: {
    color: "rgba(255, 255, 255, 0.08)",
    zeroLineWidth: 0,
    zeroLineColor: "rgba(255, 255, 255, 0.1)",
    drawBorder: false,
    tickMarkLength: 0
  }
}]
var scalesXaxes = [{
  ticks: {
    fontSize: 14,
    fontColor: "rgba(255, 255, 255, 0.4)",
    padding: 5,
    beginAtZero: true,
    autoSkip: false,
    maxTicksLimit: 4
  },
  gridLines: {
    display: false
  }
}];


if ($.exists("#tb-chart3")) {
  var ctx3 = document.querySelector("#tb-chart3").getContext("2d");
  var myChart3 = new Chart(ctx3, {
    type: "pie",
    data: {
      labels: ["Hash", "Plain Text", "Ticket"],
      datasets: [{
        backgroundColor: ["#ffcc00", "#ff3b30", "#5856d6"],
        hoverBackgroundColor: ["#ffcc00", "#ff3b30", "#5856d6"],
        data: [document.getElementById("hash_pre").value , document.getElementById("clear_pre").value , document.getElementById("ticket_pre").value],
        borderWidth: 0,
        hoverBorderColor: ["#ffcc00", "#ff3b30", "#5856d6"],
        hoverBorderWidth: 8
      }]
    },
    options: {
      cutoutPercentage: 80,
      legend: false,
      tooltips: lineChartToolTips
    }
  });
}
