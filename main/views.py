from django.shortcuts import render, redirect
from django.http import JsonResponse
import joblib
import numpy as np
import os
import logging

# Create your views here.



# Homepage
def home(request):
    # Clear session data related to images
    # request.session.pop('uploaded_images', None)
    # request.session.pop('session_id', None)
    context = {}
    return render(request, "home_page.html", context)




# Multiple Linear regression
def multipleRegression(request):
    context = {}
    return render(request, "multiple_lr.html", context)



# Performance evaluation for Linear regression
def regressionPerformance(request):
    context = {}
    return render(request, "regression_performance.html", context)


# Overfitting vs Underfitting
def underfittingOverfitting(request):
    context = {}
    return render(request, "underfitting_overfitting.html", context)



# CLASSIFICATION
# Logistic Regression
def classificationLogisticRegression(request):
    context = {}
    return render(request, "logistic_regression.html", context)


# KNN
def classificationKNN(request):
    context = {}
    return render(request, "knn.html", context)



# Naive Bayes Classifier
def naiveBayesClassifier(request):
    context = {}
    return render(request, "naive_bayes.html", context)



# Decision Tree Classifier
def decisionTreeClassifier(request):
    context = {}
    return render(request, "decision_tree.html", context)



# Ensemble Methods
def ensembleMethods(request):
    context = {}
    return render(request, "ensemble_methods.html", context)



# Performance Evaluations
def classificationPerformanceEvaluations(request):
    context = {}
    return render(request, "classification_performance.html", context)



# Convolutional Neural Networks
def convolutionalNN(request):
    context = {}
    return render(request, "cnn.html", context)


# LSTM
def lstmNN(request):
    context = {}
    return render(request, "lstm.html", context)


# Basic NeuralNet
def basicNN(request):
    context = {}
    return render(request, "basic_nn.html", context)


# CROSS VALIDATION

# K-Fold
def kfoldCV(request):
    context = {}
    return render(request, "k_fold_cv.html", context)


# LOOCV
def looCV(request):
    context = {}
    return render(request, "loo_cv.html", context)



# naive bayes spam classification model
def classify_sms(request):
    """Classify an SMS message as spam or ham."""
    
    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    # Load the Naive Bayes model and vectorizer
    model_path = 'models/naive_bayes_spam_classifier/naive_bayes_sms_model.pkl'
    vectorizer_path = 'models/naive_bayes_spam_classifier/tfidf_vectorizer.pkl'

    try:
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        logger.info('Model and vectorizer loaded successfully.')
    except Exception as e:
        logger.error(f'Error loading model or vectorizer: {str(e)}')
    
    
    
    message = request.GET.get('message', '')
    if message:
        try:
            message_vector = vectorizer.transform([message])
            prediction = model.predict(message_vector)[0]
            logger.info(f'Prediction: {prediction} for message: {message}')
            return JsonResponse({'prediction': prediction})
        except Exception as e:
            logger.error(f'Error during classification: {str(e)}')
            return JsonResponse({'error': 'Error during classification'}, status=500)
    else:
        return JsonResponse({'error': 'Message not provided'}, status=400)



# simple linear regression model to predict salary
def predict_salary(request):
    # Load the model from the file
    model = joblib.load('models/simple_linear_regression/simple_linear_regression_salary.pkl')

    # Get years of experience from the request
    years_of_experience = request.GET.get('years', 0)
    try:
        years_of_experience = float(years_of_experience)
        # Predict the salary
        prediction = model.predict(np.array([[years_of_experience]]))
        predicted_salary = prediction[0]
    except ValueError:
        return JsonResponse({'error': 'Invalid input data'}, status=400)

    return JsonResponse({'predicted_salary': predicted_salary})




def predict_multiple_lr_income(request):
    """Predict the income based on input values (Age and Experience)"""
    # Load the model
    multiple_lr_model = joblib.load('models/multiple_linear_regression/multiple_linear_regression_income.pkl')
    
    
    age = request.GET.get('age', 0)
    experience = request.GET.get('experience', 0)
    try:
        age = float(age)
        experience = float(experience)
        # Predict the income
        prediction = multiple_lr_model.predict(np.array([[age, experience]]))
        predicted_income = prediction[0]
    except ValueError:
        return JsonResponse({'error': 'Invalid input data'}, status=400)

    return JsonResponse({'predicted_income': predicted_income})