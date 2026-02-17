from tensorflow import ImageDataGenerator

def get_augmentor():
    return ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        zoom_range=0.1,
        horizontal_flip=True
    )
