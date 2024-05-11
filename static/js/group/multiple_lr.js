// Multiple Linear Regression

document.addEventListener("DOMContentLoaded", function() {
    const predictButton = document.getElementById('predict-mlr');
    const resetButton = document.getElementById('reset-mlr');
    const ageInput = document.getElementById('age');
    const experienceInput = document.getElementById('years-of-experience');
    const incomeInput = document.getElementById('predicted-income');

    predictButton.addEventListener('click', function() {
        const age = ageInput.value;
        const experience = experienceInput.value;
        fetch(`/predict_multiple_lr_income/?age=${age}&experience=${experience}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Invalid input. Please enter valid numbers for Age and Experience.');
                } else {
                    incomeInput.value = data.predicted_income.toFixed(2);
                }
            })
            .catch(error => alert('There was an error processing your request.'));
    });

    resetButton.addEventListener('click', function() {
        ageInput.value = '1';
        experienceInput.value = '1';
        incomeInput.value = '0';
    });


    // Graphing the data with Plotly
    // Fetch and visualize training data from an external URL
    fetchExternalTrainingData();

    function fetchExternalTrainingData() {
        const url = 'https://api.npoint.io/8c8763e46e1b8a7c16c5';
        fetch(url)
            .then(response => response.json())
            .then(data => draw3DScatterPlot(data))
            .catch(error => console.error('Error fetching external training data:', error));
    }

    function draw3DScatterPlot(data) {
        // Extract data
        const age = data.map(row => row.age);
        const experience = data.map(row => row.experience);
        const income = data.map(row => row.income);

        // Create 3D Scatter Plot
        const scatterTrace = {
            x: age,
            y: experience,
            z: income,
            mode: 'markers',
            marker: { color: 'blue', size: 5 },
            type: 'scatter3d'
        };

        // Define Regression Plane using Ordinary Least Squares
        const X = age.map((a, i) => [a, experience[i]]);
        const Y = income;

        // Calculate the regression coefficients using a linear algebra library
        function linearRegression(X, Y) {
            const sum = (arr) => arr.reduce((a, b) => a + b, 0);
            const mean = (arr) => sum(arr) / arr.length;

            const n = X.length;
            const sumX1 = sum(X.map((x) => x[0]));
            const sumX2 = sum(X.map((x) => x[1]));
            const sumY = sum(Y);

            const sumX1Y = sum(X.map((x, i) => x[0] * Y[i]));
            const sumX2Y = sum(X.map((x, i) => x[1] * Y[i]));
            const sumX1X2 = sum(X.map((x) => x[0] * x[1]));
            const sumX1X1 = sum(X.map((x) => x[0] * x[0]));
            const sumX2X2 = sum(X.map((x) => x[1] * x[1]));

            const A = [
                [sumX1X1, sumX1X2, sumX1],
                [sumX1X2, sumX2X2, sumX2],
                [sumX1, sumX2, n]
            ];
            const B = [sumX1Y, sumX2Y, sumY];

            // Solve the system of equations A * [a, b, c] = B
            const coefficients = gaussJordan(A, B);

            return coefficients;
        }

        function gaussJordan(A, B) {
            const n = A.length;

            // Augment the matrix
            for (let i = 0; i < n; i++) {
                A[i].push(B[i]);
            }

            for (let i = 0; i < n; i++) {
                // Normalize the pivot row
                let pivot = A[i][i];
                for (let j = i; j < n + 1; j++) {
                    A[i][j] /= pivot;
                }

                // Eliminate the other rows
                for (let k = 0; k < n; k++) {
                    if (k !== i) {
                        const factor = A[k][i];
                        for (let j = i; j < n + 1; j++) {
                            A[k][j] -= factor * A[i][j];
                        }
                    }
                }
            }

            // Extract the solution
            const result = [];
            for (let i = 0; i < n; i++) {
                result.push(A[i][n]);
            }

            return result;
        }

        const [a, b, c] = linearRegression(X, Y);

        // Define the regression plane
        const xRange = [Math.min(...age), Math.max(...age)];
        const yRange = [Math.min(...experience), Math.max(...experience)];
        const numSteps = 20;

        const xStep = (xRange[1] - xRange[0]) / numSteps;
        const yStep = (yRange[1] - yRange[0]) / numSteps;

        const planeX = [];
        const planeY = [];
        const planeZ = [];

        for (let x = xRange[0]; x <= xRange[1]; x += xStep) {
            const rowX = [];
            const rowY = [];
            const rowZ = [];
            for (let y = yRange[0]; y <= yRange[1]; y += yStep) {
                rowX.push(x);
                rowY.push(y);
                rowZ.push(a * x + b * y + c);
            }
            planeX.push(rowX);
            planeY.push(rowY);
            planeZ.push(rowZ);
        }

        const surfaceTrace = {
            x: planeX,
            y: planeY,
            z: planeZ,
            type: 'surface',
            opacity: 0.6,
            colorscale: 'Viridis'
        };

        // Plot with Plotly
        const layout = {
            // title: 'Multiple Linear Regression 3D Visualization with Regression Plane',
            scene: {
                xaxis: { title: 'Age' },
                yaxis: { title: 'Experience' },
                zaxis: { title: 'Income' }
            },
            autosize: true,
            // width: 800,
            // height: 600,
            margin: { l: 0, r: 0, b: 0, t: 0 }
        };

        var config = {responsive: true}

        // Plotly.newPlot('plot', [scatterTrace, surfaceTrace], layout, { responsive: true });
        Plotly.newPlot('plot', [scatterTrace, surfaceTrace], layout, config);
    }

});
