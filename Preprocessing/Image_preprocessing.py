import cv2

def preprocess(img_path):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (64, 64))
    img = img / 255.0
    return img
