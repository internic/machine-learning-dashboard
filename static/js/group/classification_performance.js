// classification performance evaluation

// Sample Confusion Matrix Data for Binary Classification
const confusionMatrix = [
    [50, 10],  // True Negatives (TN), False Positives (FP)
    [5, 70]    // False Negatives (FN), True Positives (TP)
  ];
  const labels = ['Class 0', 'Class 1'];

  // Create Plotly Heatmap for Confusion Matrix
  const data = [
    {
      z: confusionMatrix,
      x: labels,
      y: labels,
      type: 'heatmap',
      colorscale: 'Blues',
      showscale: true,
      hovertemplate: 'Predicted: %{x}<br>Actual: %{y}<br>Count: %{z}<extra></extra>'
    }
  ];

  // Layout for the Confusion Matrix
  const layout = {
    title: 'Confusion Matrix',
    xaxis: {
      title: 'Predicted Label'
    },
    yaxis: {
      title: 'Actual Label'
    },
    annotations: []
  };

  // Add text annotations for each cell
  for (let i = 0; i < confusionMatrix.length; i++) {
    for (let j = 0; j < confusionMatrix[i].length; j++) {
      const value = confusionMatrix[i][j];
      layout.annotations.push({
        x: labels[j],
        y: labels[i],
        text: value,
        showarrow: false,
        font: {
          color: 'black'
        }
      });
    }
  }

  // Render the Confusion Matrix
  Plotly.newPlot('confusion-matrix-plot', data, layout, { responsive: true });