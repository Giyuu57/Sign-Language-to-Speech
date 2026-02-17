import cv2
from Inference.predict_gesture import predict
from Inference.text_to_speech import speak
from Preprocessing.roi_extraction import extract_roi

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    roi = extract_roi(frame)

    gesture = predict(roi)
    cv2.putText(frame, gesture, (50,50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

    cv2.imshow("Gesture Recognition", frame)

    if cv2.waitKey(1) & 0xFF == ord('s'):
        speak(gesture)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
