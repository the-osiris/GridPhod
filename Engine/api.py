import requests

url = 'http://localhost:5001/calculate'
ids =[2732,31160,38505,50719,41744] 
data = {'productid': ids}

response = requests.post(url, json=data)
result = response.json()

print(result)