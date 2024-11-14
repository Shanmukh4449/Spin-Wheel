const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const claimButton = document.getElementById('claim-btn');

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: '₹200' },
  { minDegree: 31, maxDegree: 90, value: '₹100' },
  { minDegree: 91, maxDegree: 150, value: '₹600' },
  { minDegree: 151, maxDegree: 210, value: '₹500' },
  { minDegree: 211, maxDegree: 270, value: '₹400' },
  { minDegree: 271, maxDegree: 330, value: '₹300' },
  { minDegree: 331, maxDegree: 360, value: '₹200' },
];

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
  "#FF6F61",
  "#4ECDC4 ",
  "#FFE156 ",
  "#6A1B9A ",
  "#3F51B5 ",
  "#FF4081 ",
];

let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ['₹100', '₹200', '₹300', '₹400', '₹500', '₹600'],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      showClaimSection();
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

const showClaimSection = () => {
  claimButton.style.display = 'block';
};

claimButton.addEventListener("click", () => {
    // Redirect to the form with a redirect parameter
    window.location.href = "forms.html";
  });
  
