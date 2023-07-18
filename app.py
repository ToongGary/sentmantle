from flask import Flask, request, jsonify, send_file, render_template
from flask_restful import Resource, Api
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import numpy as np
import random

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
    variable_start_string='%%',  # Default is '{{', I'm changing this because Vue.js uses '{{' / '}}'
    variable_end_string='%%'))


model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
app = CustomFlask(__name__)

cors = CORS(app)

words_count = 463
today_i = random.randint(0, words_count)

f = open("sample/sentences", "r")
today_word = f.readlines()[today_i]
f.close()

print(today_word)

@app.route('/', methods=['GET'])
def main():
    return render_template('client.html', day=today_i)

@app.route("/image/<day>", methods=['GET'])
def image_today(day):
    return send_file("sample/images/%d.png"%today_i, mimetype='image/png')



@app.route('/', methods=['POST'])
def post():
    embeddings = model.encode([today_word, request.get_json()["text"]])
    score = embeddings[0].dot(embeddings[1])
    return jsonify({"score": int(score*100)})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5001', debug=True)
