import tkinter as tk
from PIL import Image, ImageTk
import cv2

from Inference.predict_gesture import predict
from Inference.text_to_speech import speak

# window setup
window = tk.Tk()
window.title("Sign Language Recognition")
window.geometry("800x600")

camera_running = False
cap = None

# video label
video_label = tk.Label(window)
video_label.pack()

# prediction label
prediction_var = tk.StringVar()
prediction_var.set("Prediction: ")

prediction_label = tk.Label(window, textvariable=prediction_var,
                            font=("Arial", 24))
prediction_label.pack(pady=10)


def start_camera():
    global cap, camera_running
    if not camera_running:
        cap = cv2.VideoCapture(0)
        camera_running = True
        update_frame()


def stop_camera():
    global camera_running
    camera_running = False
    if cap:
        cap.release()


def speak_text():
    text = prediction_var.get().replace("Prediction: ", "")
    if text and text != "...":
        speak(text)


def update_frame():
    if camera_running:
        ret, frame = cap.read()
        if ret:
            frame = cv2.flip(frame, 1)

            # convert to HSV for skin detection
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

            lower_skin = (0, 30, 60)
            upper_skin = (20, 150, 255)

            mask = cv2.inRange(hsv, lower_skin, upper_skin)

            # remove noise
            mask = cv2.GaussianBlur(mask, (5, 5), 0)

            contours, _ = cv2.findContours(
                mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

            if contours:
                largest = max(contours, key=cv2.contourArea)

                if cv2.contourArea(largest) > 8000:
                    x, y, w, h = 150, 50, 300, 300
                    cv2.rectangle(frame, (x, y), (x+w, y+h), (0,255,0), 2)
                    roi = frame[y:y+h, x:x+w]
                    gesture = predict(roi)
                    prediction_var.set(f"Prediction: {gesture}")


                    if roi.size != 0:
                        gesture = predict(roi)
                        prediction_var.set(f"Prediction: {gesture}")

            # convert for tkinter
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(frame)
            imgtk = ImageTk.PhotoImage(image=img)

            video_label.imgtk = imgtk
            video_label.configure(image=imgtk)

        window.after(10, update_frame)



# buttons
btn_frame = tk.Frame(window)
btn_frame.pack(pady=10)

start_btn = tk.Button(btn_frame, text="Start Camera",
                      command=start_camera, width=15)
start_btn.grid(row=0, column=0, padx=10)

stop_btn = tk.Button(btn_frame, text="Stop Camera",
                     command=stop_camera, width=15)
stop_btn.grid(row=0, column=1, padx=10)

speak_btn = tk.Button(btn_frame, text="Speak",
                      command=speak_text, width=15)
speak_btn.grid(row=0, column=2, padx=10)

window.mainloop()
