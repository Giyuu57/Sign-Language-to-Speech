from tensorflow import load_model
from tensorflow import ImageDataGenerator
from Utils.config import *

model = load_model(MODEL_PATH)

test_gen = ImageDataGenerator(rescale=1./255)
test_data = test_gen.flow_from_directory(
    DATASET_PATH + "test",
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

loss, acc = model.evaluate(test_data)
print("Accuracy:", acc)
