var bar = echarts.init(document.querySelector(".bar").querySelector('.echart'));
var option_1 = {
  // color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  color: ["#2f89cf"],
  grid: {
    top: "3%",
    left: "0",
    right: "4%",
    bottom: "",
    containLabel: true,
  },
  xAxis: [
    {
      data:[],
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 1,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        color: "rgba(255,255,255,.6)",
        fontSize: "12",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.5)",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
    },
  ],
  series: [
    {
      name: "人数",
      type: "bar",
      barWidth: "20px",
      data: [200, 300, 300, 900, 1460, 1200, 600],
      itemStyle: {
        normal: {
          barBorderRadius: [5, 5, 5, 5],
        },
      },
    },
  ],
};
bar.setOption(option_1);

$(".bar a:eq(1)").on("click", () => {
  bar.setOption({
    series: [
      {
        data: [300, 400, 350, 800, 1800, 1400, 700],
      },
    ],
  });
});
$(".bar a:eq(0)").on("click", () => {
  bar.setOption({
    series: [
      {
        data:[200, 300, 300, 900, 1460, 1200, 600],
      },
    ],
  });
});

var line = echarts.init(
  document.querySelector(".line").querySelector(".echart")
);
var option_2 = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    left: "right",
    textStyle: { color: "#FFFDFE" },
  },
  grid: {
    top: "10%",
    left: "0",
    right: "4%",
    bottom: "",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
    ],
    axisLabel: {
      interval: 1,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        color: "rgba(255,255,255,.1)",
      },
    },
  },
  series: [
    {
      name: "2021",
      data: [80, 100, 300, 350, 400, 420, 440, 400, 320, 280, 250],
      color: ["#ffff"],
      type: "line",
      smooth:true,
    },
    {
      name: "2022",
      data: [50, 60, 90, 120, 130, 125, 150, 200, 230, 180, 250],
      type: "line",
      smooth:true,
    },
  ],
};
line.setOption(option_2);

var pie = echarts.init(document.querySelector(".pie").querySelector(".echart"));
var option_3 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    x: "center",
    y: "bottom",
    textStyle: { color: "#FFFDFE" },
  },
  series: [
    {
      name: "年龄",
      type: "pie",
      radius: ["45%", "70%"],
      avoidLabelOverlap: false,
      color: ["#025485", "#026685", "#017586", "#077D89", "#044B8C"],
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "20" },
        { value: 735, name: "21" },
        { value: 580, name: "22" },
        { value: 484, name: "23" },
        { value: 300, name: "24" },
      ],
    },
  ],
};
pie.setOption(option_3);

var mgpie = echarts.init(
  document.querySelector(".mgpie").querySelector(".echart")
);
var option_4 = {
  legend: {
    bottom: "bottom",
    textStyle: {
      color: "#fff",
    },
  },
  grid: {
    top: "0",
  },
  series: [
    {
      name: "地区",
      type: "pie",
      radius: [20, 70],
      center: ["50%", "50%"],
      roseType: "area",
      data: [
        { value: 40, name: "云南" },
        { value: 38, name: "武汉" },
        { value: 32, name: "广州" },
        { value: 30, name: "南京" },
        { value: 28, name: "北京" },
        { value: 26, name: "深圳" },
        { value: 22, name: "东莞" },
        { value: 18, name: "中山" },
      ],
    },
  ],
};
mgpie.setOption(option_4);

var ysbar = echarts.init(
  document.querySelector(".ysbar").querySelector(".echart")
);
var option_5 = {
  dataset: {
    source: [
      ["precent", "amount", "product"],
      [90, 58212, "计算机科学"],
      [91, 78254, "软件工程"],
      [93, 41032, "网络安全"],
      [88, 12755, "信息安全"],
      [85, 20145, "智能科学"],
    ],
  },
  grid: {
    left: "20%",
    top: "8%",
    bottom: "10%",
  },
  xAxis: {
    name: "precent",
    show: false,
  },
  yAxis: {
    type: "category",
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  series: [
    {
      type: "bar",
      stack:'jiuye',
      barWidth: "18px",
      encode: {
        x: "amount",
        y: "product",
      },
      itemStyle: {
        normal: {
          borderWidth: 1,
          borderColor: "#ffff",
          barBorderRadius: [18],
          label: {
            show: true,
            position: "right",
          },
        },
      },
    }
  ],
};
ysbar.setOption(option_5);
