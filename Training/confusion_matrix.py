import numpy as np
from sklearn.metrics import confusion_matrix
from tensorflow import load_model
from tensorflow import ImageDataGenerator
from Utils.config import *

model = load_model(MODEL_PATH)

gen = ImageDataGenerator(rescale=1./255)
data = gen.flow_from_directory(
    DATASET_PATH + "test",
    target_size=IMAGE_SIZE,
    batch_size=1,
    shuffle=False,
    class_mode="categorical"
)

preds = model.predict(data)
cm = confusion_matrix(data.classes, preds.argmax(axis=1))
print(cm)
