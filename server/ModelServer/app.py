from flask import Flask, render_template, request , jsonify , make_response
import json
import numpy as np
import cv2
from keras.models import load_model
from flask_cors import CORS
import tensorflow as tf

app = Flask(__name__)
CORS(app)
# JSON ENCODER

# def parse_json(data):
#     return json.loads(json_util.dumps(data))

def parse_json(data):
    if isinstance(data, str):
        return json.loads(data)
    elif isinstance(data, dict):
        return json.loads(json.dumps(data))
    else:
        raise ValueError("Invalid input type. Expected string or dictionary.")

def predict_brain_tumor(img_path):
    print("1")
    model = tf.keras.models.load_model('model.keras')
    img = cv2.resize(img_path,(168,168))
    img = np.expand_dims(img, axis=-1)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    pred = model.predict(img)
    predicted_class = np.argmax(pred)
    brain_tumor = ['Pituitary', 'No Tumor', 'Glioma', 'Meningioma']
    return brain_tumor[predicted_class]

    
@app.route("/docheck")
def dooo():
    return jsonify({"message" : "mil gaya chutiye"})


@app.route("/uploadTest" , methods=["POST"])
def do_upload():
    try:
        data = request.get_json()
        f = data.get('image')
        npImage = np.array(f['data'] , dtype=np.uint8)
        image_np = cv2.imdecode(npImage, cv2.IMREAD_GRAYSCALE)
        print(image_np.shape)
        ans = predict_brain_tumor(image_np)
        return jsonify(ans)
    except Exception as e:
        return e

if __name__ == "__main__":
    app.run(debug=True , port=5000)






# @app.route("/hello" ,methods=["POST"])
# def do():
#     try:
#         data = request.get_json()
#         return jsonify({"message" : data})
#         # img = data.get('name')
#         # return img
#     except Exception as e: 
#         print(e)
#         return e

# waitress.serve(app, listen='0.0.0.0:5003')



    #venv\Scripts\activate 
    #python .\app.py 