from django.urls import path
from . import views
from .views import predict_salary, multipleRegression, regressionPerformance


urlpatterns = [
    path("", views.home, name="home"),
    path('predict_salary/', views.predict_salary, name='predict_salary'),
    
    path('multiple-regression/', views.multipleRegression, name='multipleRegression'),
    path('predict_multiple_lr_income/', views.predict_multiple_lr_income, name='predict_multiple_lr_income'),
    
    path('regression-performance/', views.regressionPerformance, name='regressionPerformance'),
    
    path('overfitting-underfitting/', views.underfittingOverfitting, name='underfittingOverfitting'),
    
    # Classification
    path('logistic-regression/', views.classificationLogisticRegression, name='classificationLogisticRegression'),
    path('knn/', views.classificationKNN, name='classificationKNN'),
    path('naive-bayes-classifier/', views.naiveBayesClassifier, name='naiveBayesClassifier'),
    
    path('classify_sms/', views.classify_sms, name='classify_sms'),
    
    path('decision-tree-classifier/', views.decisionTreeClassifier, name='decisionTreeClassifier'),
    
    path('ensemble-methods/', views.ensembleMethods, name='ensembleMethods'),
    
    path('classification-performance/', views.classificationPerformanceEvaluations, name='classificationPerformanceEvaluations'),
    
    # Cross Validation
    path('k-fold/', views.kfoldCV, name='kfoldCV'),
    path('loo-cv/', views.looCV, name='looCV'),
    
    
    # Neural networks
    path('basic-neuralnet/', views.basicNN, name='basicNN'),
    path('lstm/', views.lstmNN, name='lstmNN'),
    path('cnn/', views.convolutionalNN, name='convolutionalNN'),
    

]