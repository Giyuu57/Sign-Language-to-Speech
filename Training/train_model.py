from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
from models.cnn_model import build_model
from Utils.config import *

# Load dataset
train_gen = ImageDataGenerator(rescale=1./255, rotation_range=10, zoom_range=0.1, horizontal_flip=True)
test_gen = ImageDataGenerator(rescale=1./255)

train_data = train_gen.flow_from_directory(
    DATASET_PATH + "train",
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

test_data = test_gen.flow_from_directory(
    DATASET_PATH + "test",
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode="categorical"
)

# Build CNN
model = build_model(NUM_CLASSES)

model.compile(
    optimizer=Adam(),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# Train model
model.fit(
    train_data,
    validation_data=test_data,
    epochs=EPOCHS
)

# Save model
model.save(MODEL_PATH)

print("✅ Training complete. Model saved.")
