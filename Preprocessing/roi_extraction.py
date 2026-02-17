import cv2

def extract_roi(frame):
    x, y, w, h = 50, 50, 400, 400
    roi = frame[y:y+h, x:x+w]
    return roi
