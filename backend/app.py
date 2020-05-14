# -*- coding: utf-8 -*-
"""
Created on Fri May  8 01:22:05 2020

@author: kenne
"""


from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps, loads
from flask_jsonpify import jsonify

import pandas as pd
#from models import Result

app = Flask(__name__)
api = Api(app)

CORS(app)

@app.route("/")
def hello():
    return jsonify({'text':'Hello World!'})

@app.route('/echo', methods=['POST'])
class Test(Resource):
     def get(self):
        data = pd.read_csv('SOXX.csv', index_col = 0)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']

@app.route('/echo', methods=['POST'])
class GetCorr(Resource):
     def get(self):
        data = pd.read_csv('corr.csv', index_col = 0).dropna().round(3)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']

@app.route('/echo', methods=['POST'])
class HSI_Prices(Resource):
     
    def get(self, ticker='HSI'):
        data = pd.read_csv(ticker +'.csv', index_col = 0)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']

@app.route('/echo', methods=['POST'])
class EURSGD_Prices(Resource):
     
    def get(self, ticker='EURSGD'):
        data = pd.read_csv(ticker +'.csv', index_col = 0)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']

@app.route('/echo', methods=['POST'])
class SOXX_Prices(Resource):
     
    def get(self, ticker='SOXX'):
        data = pd.read_csv(ticker +'.csv', index_col = 0)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']

@app.route('/echo', methods=['POST'])
class GetScatter(Resource):
     def get(self):
        data = pd.read_csv('scatter.csv', index_col = 0).dropna().round(3)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']
    
@app.route('/echo', methods=['POST'])
class GetRadar(Resource):
     def get(self):
        data = pd.read_csv('radar.csv', index_col = 0).dropna().round(3)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        return parsed_json['data']
    
@app.route('/echo', methods=['POST'])
class GetData(Resource):
     def get(self):
         
#        import urllib.request, json 
#        with urllib.request.urlopen("https://bi.syncfusion.com/northwindservice/api/orders") as url:
#            data = json.loads(url.read())
#            return data
        data = pd.read_csv('test-data.csv', index_col = 0).dropna().round(3)
        data = data.to_json(orient='table')
        parsed_json = (loads(data))
        formatted_data = dict(zip(['Items', 'Count'], [parsed_json['data'], len(parsed_json['data'])]))
        return formatted_data

api.add_resource(Test, '/test')
api.add_resource(HSI_Prices, '/prices/HSI')
api.add_resource(EURSGD_Prices, '/prices/EURSGD')
api.add_resource(SOXX_Prices, '/prices/SOXX')
api.add_resource(GetCorr, '/corr') 
api.add_resource(GetScatter, '/scatter') 
api.add_resource(GetRadar, '/radar') 
api.add_resource(GetData, '/test-data/') 



if __name__ == '__main__':
   app.run(port=5002)