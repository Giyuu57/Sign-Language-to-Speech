import cv2
import os
import numpy as np
from tensorflow import keras
from Utils.helper_functions import preprocess_image
from Utils.config import *

model = keras.models.load_model(MODEL_PATH)
labels = sorted(os.listdir("dataset/train"))

def predict(frame):
    img = preprocess_image(frame)
    pred = model.predict(img)[0]
    confidence = max(pred)
    print("Confidence:", confidence)

    return labels[pred.argmax()]
