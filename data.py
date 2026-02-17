import cv2
import os


directory = "dataset/train"

os.makedirs(directory, exist_ok=True)

os.makedirs(os.path.join(directory, "blank"), exist_ok=True)

for i in range(65, 91):
    os.makedirs(os.path.join(directory, chr(i)), exist_ok=True)

print("Folders ready!")

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Camera not detected")
    exit()

print("\nPress keys A-Z to save images")
print("Press '.' to save BLANK")
print("Press ESC to exit\n")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    count = {chr(i): len(os.listdir(os.path.join(directory, chr(i)))) for i in range(65,91)}
    count["blank"] = len(os.listdir(os.path.join(directory, "blank")))

    cv2.rectangle(frame, (170, 80), (470, 340), (255, 255, 255), 2)

    y_pos = 20
    for letter in ['A','B','C','D','E']:
        cv2.putText(frame, f"{letter}: {count[letter]}", (10, y_pos),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 1)
        y_pos += 20

    cv2.putText(frame, f"Blank: {count['blank']}", (10, y_pos),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,255,0), 1)

    cv2.imshow("Data Collection", frame)

    roi = frame[80:340, 170:470]
    cv2.imshow("ROI", roi)

    roi = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
    roi = cv2.resize(roi, (128, 128))

    key = cv2.waitKey(10) & 0xFF

    if ord('a') <= key <= ord('z'):
        letter = chr(key).upper()
        filename = f"{count[letter]}.jpg"
        path = os.path.join(directory, letter, filename)
        cv2.imwrite(path, roi)
        print(f"Saved {letter} -> {filename}")

    elif key == ord('.'):
        filename = f"{count['blank']}.jpg"
        path = os.path.join(directory, "blank", filename)
        cv2.imwrite(path, roi)
        print("Saved BLANK")

    elif key == 27:
        break

cap.release()
cv2.destroyAllWindows()
print("\nDataset collection finished!")
