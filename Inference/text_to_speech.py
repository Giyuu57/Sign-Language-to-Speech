import pyttsx3

def speak(text):
    engine = pyttsx3.init('sapi5')
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1.0)

    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[1].id)

    engine.say(text)
    engine.runAndWait()
    engine.stop()
