// Naive Bayes sms spam classifier

document.addEventListener("DOMContentLoaded", function() {
    const classifyButton = document.getElementById('classify-sms');
    const resetButton = document.getElementById('reset-sms');
    const messageInput = document.getElementById('sms-message');
    const predictionResult = document.getElementById('sms-prediction');

    classifyButton.addEventListener('click', function() {
        const message = messageInput.value;
        fetch(`/classify_sms/?message=${encodeURIComponent(message)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    predictionResult.value = `Prediction: ${data.prediction}`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error processing your request.');
            });
    });

    resetButton.addEventListener('click', function() {
        messageInput.value = '';
        predictionResult.value = '';
    });
});
