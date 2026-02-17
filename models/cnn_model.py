from tensorflow import keras

def build_model(num_classes):
    model = keras.Sequential([
        keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(64,64,3)),
        keras.layers.MaxPooling2D(2,2),

        keras.layers.Conv2D(64, (3,3), activation='relu'),
        keras.layers.MaxPooling2D(2,2),

        keras.layers.Conv2D(128, (3,3), activation='relu'),
        keras.layers.MaxPooling2D(2,2),

        keras.layers.Flatten(),
        keras.layers.Dense(128, activation='relu'),
        keras.layers.Dropout(0.5),

        keras.layers.Dense(num_classes, activation='softmax')
    ])
    return model
