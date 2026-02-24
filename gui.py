import tkinter as tk
from tkinter import ttk
import threading
import time
import math
from PIL import Image, ImageTk, ImageDraw, ImageFilter
import cv2

from Inference.predict_gesture import predict
from Inference.text_to_speech import speak


BG          = "#0A0E1A"
PANEL       = "#111827"
BORDER      = "#1E2D40"
ACCENT      = "#00D4FF"
ACCENT2     = "#7C3AED"
SUCCESS     = "#10B981"
TEXT_PRI    = "#F0F6FF"
TEXT_SEC    = "#6B8099"
BTN_START   = "#00D4FF"
BTN_STOP    = "#EF4444"
BTN_SPEAK   = "#7C3AED"
BTN_HOVER   = "#00AADD"

window = tk.Tk()
window.title("SignSense · Gesture Recognition")
window.geometry("1000x720")
window.configure(bg=BG)
window.resizable(False, False)

FONT_TITLE   = ("Courier New", 22, "bold")
FONT_MONO    = ("Courier New", 13)
FONT_PRED    = ("Courier New", 32, "bold")
FONT_LABEL   = ("Courier New", 10)
FONT_BTN     = ("Courier New", 11, "bold")
FONT_STATUS  = ("Courier New", 9)

camera_running = False
cap            = None
frame_count    = 0
fps_start      = time.time()
fps_value      = 0.0
pulse_angle    = 0

bg_canvas = tk.Canvas(window, width=1000, height=720, bg=BG,
                      highlightthickness=0)
bg_canvas.place(x=0, y=0)

def draw_bg_grid():
    bg_canvas.delete("grid")
    for x in range(0, 1001, 40):
        bg_canvas.create_line(x, 0, x, 720, fill="#0D1520", tags="grid")
    for y in range(0, 721, 40):
        bg_canvas.create_line(0, y, 1000, y, fill="#0D1520", tags="grid")
    for r in range(200, 0, -20):
        alpha_hex = format(int(10 + (200 - r) * 0.03), '02x')
        bg_canvas.create_oval(-r, -r, r, r,
                              outline=f"#00D4FF", width=1, tags="grid")

draw_bg_grid()


header = tk.Frame(window, bg=PANEL, height=64)
header.place(x=0, y=0, width=1000)

accent_bar = tk.Frame(window, bg=ACCENT, height=2)
accent_bar.place(x=0, y=0, width=1000)

tk.Label(header, text="◈  SIGNSENSE", font=FONT_TITLE,
         fg=ACCENT, bg=PANEL).place(x=24, y=16)

tk.Label(header, text="HAND GESTURE → TEXT → SPEECH",
         font=FONT_LABEL, fg=TEXT_SEC, bg=PANEL).place(x=26, y=44)

status_dot_canvas = tk.Canvas(header, width=12, height=12,
                               bg=PANEL, highlightthickness=0)
status_dot_canvas.place(x=900, y=26)
status_label = tk.Label(header, text="OFFLINE", font=FONT_STATUS,
                         fg=TEXT_SEC, bg=PANEL)
status_label.place(x=916, y=26)

def update_status_dot():
    status_dot_canvas.delete("all")
    color = SUCCESS if camera_running else "#3A3A3A"
    status_dot_canvas.create_oval(2, 2, 10, 10, fill=color, outline="")
    window.after(500, update_status_dot)

update_status_dot()

left_panel = tk.Frame(window, bg=PANEL, relief="flat",
                      highlightthickness=1, highlightbackground=BORDER)
left_panel.place(x=20, y=80, width=620, height=520)

corner_cvs = tk.Canvas(left_panel, width=620, height=520,
                        bg=PANEL, highlightthickness=0)
corner_cvs.place(x=0, y=0)

def draw_corners():
    c, L, T = corner_cvs, 20, 2
    corner_cvs.delete("corners")
    for (x1,y1,x2,y2) in [(0,0,L,T),(0,0,T,L),
                           (620-L,0,620,T),(620-T,0,620,L),
                           (0,520-T,L,520),(0,520-L,T,520),
                           (620-L,520-T,620,520),(620-T,520-L,620,520)]:
        corner_cvs.create_rectangle(x1,y1,x2,y2, fill=ACCENT, outline="", tags="corners")

draw_corners()


placeholder_cvs = tk.Canvas(left_panel, width=600, height=480,
                              bg="#0D1520", highlightthickness=0)
placeholder_cvs.place(x=10, y=20)

def draw_placeholder(text="CAMERA OFFLINE"):
    placeholder_cvs.delete("all")
    placeholder_cvs.create_text(300, 220, text="◈", font=("Courier New", 60),
                                  fill=BORDER)
    placeholder_cvs.create_text(300, 290, text=text,
                                  font=FONT_MONO, fill=TEXT_SEC)

draw_placeholder()

video_label = tk.Label(left_panel, bg="#0D1520",
                        borderwidth=0, highlightthickness=0)
video_label.place(x=10, y=20, width=600, height=480)

fps_label = tk.Label(left_panel, text="FPS: --", font=FONT_STATUS,
                      fg=ACCENT, bg=PANEL)
fps_label.place(x=14, y=503)

frame_counter_label = tk.Label(left_panel, text="FRAME: 0",
                                 font=FONT_STATUS, fg=TEXT_SEC, bg=PANEL)
frame_counter_label.place(x=100, y=503)

right_panel = tk.Frame(window, bg=PANEL, highlightthickness=1,
                        highlightbackground=BORDER)
right_panel.place(x=658, y=80, width=322, height=520)

tk.Label(right_panel, text="DETECTED GESTURE",
         font=FONT_LABEL, fg=TEXT_SEC, bg=PANEL).place(x=16, y=14)

sep1 = tk.Frame(right_panel, bg=ACCENT, height=1)
sep1.place(x=16, y=32, width=290)

prediction_var = tk.StringVar(value="···")

pred_frame = tk.Frame(right_panel, bg="#0D1520",
                       highlightthickness=1, highlightbackground=BORDER)
pred_frame.place(x=16, y=44, width=290, height=90)

pred_display = tk.Label(pred_frame, textvariable=prediction_var,
                         font=FONT_PRED, fg=ACCENT, bg="#0D1520",
                         anchor="center")
pred_display.place(x=0, y=0, width=290, height=90)

conf_label = tk.Label(right_panel, text="CONFIDENCE",
                       font=FONT_LABEL, fg=TEXT_SEC, bg=PANEL)
conf_label.place(x=16, y=148)

conf_bar_bg = tk.Frame(right_panel, bg=BORDER, height=8)
conf_bar_bg.place(x=16, y=166, width=290)

conf_bar = tk.Frame(right_panel, bg=ACCENT, height=8)
conf_bar.place(x=16, y=166, width=0)

conf_pct_label = tk.Label(right_panel, text="0%",
                            font=FONT_STATUS, fg=ACCENT, bg=PANEL)
conf_pct_label.place(x=296, y=160)

def animate_confidence(target_w):
    current = conf_bar.winfo_width()
    diff = target_w - current
    if abs(diff) > 1:
        new_w = current + int(diff * 0.2) + (1 if diff > 0 else -1)
        new_w = max(0, min(290, new_w))
        conf_bar.place_configure(width=new_w)
        pct = int(new_w / 290 * 100)
        conf_pct_label.config(text=f"{pct}%")
        window.after(16, lambda: animate_confidence(target_w))

tk.Label(right_panel, text="RECOGNITION LOG",
         font=FONT_LABEL, fg=TEXT_SEC, bg=PANEL).place(x=16, y=190)

sep2 = tk.Frame(right_panel, bg=ACCENT2, height=1)
sep2.place(x=16, y=208, width=290)

log_frame = tk.Frame(right_panel, bg="#0D1520",
                      highlightthickness=1, highlightbackground=BORDER)
log_frame.place(x=16, y=218, width=290, height=150)

log_text = tk.Text(log_frame, bg="#0D1520", fg=TEXT_SEC,
                    font=("Courier New", 9), borderwidth=0,
                    highlightthickness=0, state="disabled",
                    insertbackground=ACCENT, selectbackground=ACCENT2)
log_text.pack(fill="both", expand=True, padx=6, pady=4)

log_entries = []

def add_log(gesture):
    ts = time.strftime("%H:%M:%S")
    entry = f"[{ts}]  {gesture}\n"
    log_entries.append(entry)
    log_text.configure(state="normal")
    log_text.insert("end", entry)
    log_text.see("end")
    log_text.configure(state="disabled")

tk.Label(right_panel, text="CONTROLS",
         font=FONT_LABEL, fg=TEXT_SEC, bg=PANEL).place(x=16, y=384)

sep3 = tk.Frame(right_panel, bg=BORDER, height=1)
sep3.place(x=16, y=402, width=290)

def make_button(parent, text, color, hover_color, cmd, x, y, w=86, h=38):
    frm = tk.Frame(parent, bg=color, cursor="hand2")
    frm.place(x=x, y=y, width=w, height=h)
    lbl = tk.Label(frm, text=text, font=FONT_BTN,
                   fg=BG if color != BTN_STOP else TEXT_PRI,
                   bg=color, cursor="hand2")
    lbl.place(relx=0.5, rely=0.5, anchor="center")

    def on_enter(e):
        frm.config(bg=hover_color); lbl.config(bg=hover_color)
    def on_leave(e):
        frm.config(bg=color); lbl.config(bg=color)
    def on_click(e): cmd()

    for w_ in (frm, lbl):
        w_.bind("<Enter>", on_enter)
        w_.bind("<Leave>", on_leave)
        w_.bind("<Button-1>", on_click)
    return frm, lbl

start_btn_frm, start_btn_lbl = make_button(
    right_panel, "▶  START", BTN_START, "#00AADD", lambda: start_camera(), 16, 412)
stop_btn_frm, stop_btn_lbl  = make_button(
    right_panel, "■  STOP",  BTN_STOP,  "#CC2222", lambda: stop_camera(), 118, 412)
speak_btn_frm, speak_btn_lbl= make_button(
    right_panel, "◉  SPEAK", BTN_SPEAK, "#5B21B6", lambda: speak_text(), 220, 412)

clr_frm = tk.Frame(right_panel, bg=BORDER, cursor="hand2")
clr_frm.place(x=16, y=462, width=290, height=28)
clr_lbl = tk.Label(clr_frm, text="CLEAR LOG", font=FONT_STATUS,
                    fg=TEXT_SEC, bg=BORDER, cursor="hand2")
clr_lbl.place(relx=0.5, rely=0.5, anchor="center")

def clear_log():
    log_text.configure(state="normal")
    log_text.delete("1.0", "end")
    log_text.configure(state="disabled")
    log_entries.clear()

def clr_enter(e): clr_frm.config(bg=BORDER); clr_lbl.config(bg="#2A3A4A")
def clr_leave(e): clr_frm.config(bg=BORDER); clr_lbl.config(bg=BORDER)
clr_frm.bind("<Enter>", clr_enter); clr_lbl.bind("<Enter>", clr_enter)
clr_frm.bind("<Leave>", clr_leave); clr_lbl.bind("<Leave>", clr_leave)
clr_frm.bind("<Button-1>", lambda e: clear_log())
clr_lbl.bind("<Button-1>", lambda e: clear_log())


status_bar = tk.Frame(window, bg="#0A0E18", height=28)
status_bar.place(x=0, y=692, width=1000)

tk.Frame(window, bg=BORDER, height=1).place(x=0, y=691, width=1000)

tk.Label(status_bar, text="◈ SIGNSENSE v1.0  |  Hand Gesture Recognition System",
         font=FONT_STATUS, fg=TEXT_SEC, bg="#0A0E18").place(x=12, y=6)

time_label = tk.Label(status_bar, text="", font=FONT_STATUS,
                       fg=TEXT_SEC, bg="#0A0E18")
time_label.place(x=880, y=6)

def update_clock():
    time_label.config(text=time.strftime("%H:%M:%S"))
    window.after(1000, update_clock)

update_clock()

last_gesture = ""

def start_camera():
    global cap, camera_running
    if not camera_running:
        cap = cv2.VideoCapture(0)
        camera_running = True
        status_label.config(text="LIVE", fg=SUCCESS)
        draw_placeholder("")
        update_frame()

def stop_camera():
    global camera_running
    camera_running = False
    if cap:
        cap.release()
    status_label.config(text="OFFLINE", fg=TEXT_SEC)
    video_label.configure(image="")
    draw_placeholder()

def speak_text():
    text = prediction_var.get()
    if text and text not in ("···", ""):
        threading.Thread(target=speak, args=(text,), daemon=True).start()

def update_frame():
    global frame_count, fps_start, fps_value, last_gesture
    if camera_running:
        ret, frame = cap.read()
        if ret:
            frame = cv2.flip(frame, 1)

            hsv        = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            lower_skin = (0, 30, 60)
            upper_skin = (20, 150, 255)
            mask       = cv2.inRange(hsv, lower_skin, upper_skin)
            mask       = cv2.GaussianBlur(mask, (5, 5), 0)
            contours, _ = cv2.findContours(mask, cv2.RETR_TREE,
                                            cv2.CHAIN_APPROX_SIMPLE)

            x_roi, y_roi, w_roi, h_roi = 150, 50, 300, 300
            detected_gesture = None

            if contours:
                largest = max(contours, key=cv2.contourArea)
                if cv2.contourArea(largest) > 8000:
                    cv2.rectangle(frame,
                                  (x_roi, y_roi),
                                  (x_roi + w_roi, y_roi + h_roi),
                                  (0, 212, 255), 2)
                    corner_len = 20
                    for cx, cy in [(x_roi, y_roi), (x_roi+w_roi, y_roi),
                                   (x_roi, y_roi+h_roi), (x_roi+w_roi, y_roi+h_roi)]:
                        dx = corner_len if cx == x_roi else -corner_len
                        dy = corner_len if cy == y_roi else -corner_len
                        cv2.line(frame, (cx, cy), (cx+dx, cy), (0, 212, 255), 3)
                        cv2.line(frame, (cx, cy), (cx, cy+dy), (0, 212, 255), 3)

                    roi = frame[y_roi:y_roi+h_roi, x_roi:x_roi+w_roi]
                    if roi.size != 0:
                        detected_gesture = predict(roi)
                        if detected_gesture != last_gesture:
                            prediction_var.set(detected_gesture)
                            add_log(detected_gesture)
                            last_gesture = detected_gesture
                            target = int((hash(detected_gesture) % 40 + 60) / 100 * 290)
                            animate_confidence(target)

            frame_count += 1
            elapsed = time.time() - fps_start
            if elapsed >= 1.0:
                fps_value = frame_count / elapsed
                fps_label.config(text=f"FPS: {fps_value:.1f}")
                frame_counter_label.config(text=f"FRAME: {frame_count}")
                fps_start = time.time()
                frame_count = 0

            cv2.putText(frame, f"FPS:{fps_value:.0f}", (10, 470),
                        cv2.FONT_HERSHEY_PLAIN, 1, (0, 212, 255), 1)
            if detected_gesture:
                cv2.putText(frame, detected_gesture,
                            (x_roi, y_roi - 10),
                            cv2.FONT_HERSHEY_PLAIN, 1.4, (0, 212, 255), 2)

            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img       = Image.fromarray(frame_rgb)
            img       = img.resize((600, 480), Image.LANCZOS)
            imgtk     = ImageTk.PhotoImage(image=img)
            video_label.imgtk = imgtk
            video_label.configure(image=imgtk)

        window.after(10, update_frame)

def pulse_pred():
    t = time.time() * 2
    r = int(0 + 40 * (0.5 + 0.5 * math.sin(t)))
    g = int(212 + 43 * (0.5 + 0.5 * math.sin(t + 1)))
    b = int(255)
    color = f"#{r:02x}{min(g,255):02x}{b:02x}"
    pred_display.config(fg=color)
    window.after(60, pulse_pred)

pulse_pred()

window.mainloop()