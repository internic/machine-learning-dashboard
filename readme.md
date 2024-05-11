# Machine Learning Dashboard

## Project Overview

This project features a Machine Learning Dashboard that demonstrates various machine learning algorithms and their applications. The dashboard includes interactive visualizations and demonstrations of algorithms like Linear Regression, Decision Trees, Naive Bayes, and more.

### Features

- Interactive visualizations of machine learning algorithms.
- Demonstrations of performance evaluation metrics like Confusion Matrix, Accuracy, Recall, and F1 Score.
- Real-time demonstrations using Django for backend processing.


### Installing

A step-by-step series of examples that tell you how to get a development environment running.

#### Clone the Repository

```bash
git clone https://github.com/internic/machine-learning-dashboard.git
cd machine-learning-dashboard
```

#### Setup Virtual Environment

##### Windows

```bash
python -m venv venv

venv\Scripts\activate
```

##### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Running the Application

```bash
cd src
python manage.py runserver
```

Navigate to `http://localhost:8000/` to view the dashboard.



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.