from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import numpy as np
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
app = Flask(__name__)

cors = CORS(app)

today_word = "A bird is flying on a tree."


@app.route('/', methods=['POST'])
def post():
    embeddings = model.encode([today_word, request.get_json()["text"]])
    score = embeddings[0].dot(embeddings[1])
    return jsonify({"score": int(score*100)})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5000', debug=True)
