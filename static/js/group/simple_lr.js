// Simple Linear Regression Plot

// Import Observable Plot via ES Module
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Generate random data with noise and outliers
function generateRandomData(numPoints) {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    const x = Math.random() * 100;
    // Introduce normal noise around the linear relationship
    const y = 2 * x + 10 + Math.random() * 40 - 20; // Noise between -20 and 20
    data.push({ x, y });
  }

  // Add a few outliers
  for (let i = 0; i < numPoints * 0.05; i++) {
    const x = Math.random() * 100;
    // Outliers with extreme deviations
    const y = 2 * x + 10 + Math.random() * 200 - 100; // Noise between -100 and 100
    data.push({ x, y });
  }

  return data;
}

// Create the plot
function drawPlot(data, m) {
  const plot = Plot.plot({
    marks: [
      Plot.dot(data, { x: "x", y: "y", fill: "currentColor", fillOpacity: 0.2 }),
      Plot.dot(data.slice(0, m), { x: "x", y: "y" }),
      Plot.linearRegressionY(data.slice(0, m), { x: "x", y: "y", stroke: "red" })
    ],
    x: { label: "X Values" },
    y: { label: "Y Values" },
    grid: true
  });
  document.getElementById("plot").replaceChildren(plot);
}

// Initialize plot with slider
const allData = generateRandomData(400);
const slider = document.getElementById("range-slider");
const rangeValue = document.getElementById("range-value");

function updatePlot() {
  const value = parseInt(slider.value, 10);
  rangeValue.textContent = value;
  drawPlot(allData, value);
}

slider.addEventListener("input", updatePlot);
updatePlot(); // Initial plot


// Model prediction for simple linear regression
document.addEventListener("DOMContentLoaded", function() {
    const predictButton = document.getElementById('predict-lr');
    const resetButton = document.getElementById('reset-lr');
    const yearsInput = document.getElementById('years-of-experience');
    const salaryInput = document.getElementById('predicted-salary');

    predictButton.addEventListener('click', function() {
        const years = yearsInput.value;
        fetch(`/predict_salary/?years=${years}`)
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    alert('Invalid input. Please enter a valid number of years.');
                } else {
                    salaryInput.value = data.predicted_salary.toFixed(2);
                }
            })
            .catch(error => alert('There was an error processing your request.'));
    });

    resetButton.addEventListener('click', function() {
        yearsInput.value = '0';
        salaryInput.value = '0';
    });
});