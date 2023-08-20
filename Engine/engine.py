# %%
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import StandardScaler
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = pd.read_csv("fashion.csv")
    data1 = request.json
    # data1 = request.json
    # result = your_python_calculation_function(data1['input'])
    # return jsonify({'result': result}

    # %%
    X = data.drop(['ProductId', 'ProductTitle', 'Image', 'ImageURL', 'retail_price', 'user_rating', 'no_purchase'], axis=1)
    X = pd.get_dummies(X)  # Convert categorical variables to one-hot encoding
    X = StandardScaler().fit_transform(X)  # Standardize features

    # %%
    # k-means clustering
    num_clusters = 20
    kmeans = KMeans(n_clusters=num_clusters, n_init=10, random_state=42)
    data['cluster'] = kmeans.fit_predict(X)

    # %%
    # SVD
    svd = TruncatedSVD(n_components=10, random_state=42)
    X_svd = svd.fit_transform(X)


    # %%
    # Combine k-means clusters and SVD components
    combined_features = np.hstack((X_svd, np.array(data['cluster']).reshape(-1, 1)))

    # cosine similarity
    from sklearn.metrics.pairwise import cosine_similarity
    similarities = cosine_similarity(combined_features)

    # %%
    data.head(10)

    # %%
    # function to recommend products
    def recommend_products(product_id, num_recommendations=10):
        product_index = data[data['ProductId'] == product_id].index
        if len(product_index) > 0:
            product_index = product_index[0]
        else:
            print("Product ID not found in the dataset.")
            return
        similar_products = similarities[product_index].argsort()[-num_recommendations-1:-1][::-1]
        recommended_products = data.iloc[similar_products]
        return recommended_products[['ProductId', 'ProductTitle']]


    product_to_recommend = data1['productid']
    n=len(product_to_recommend)
    vis={}
    ans=[]
    for i in product_to_recommend:
        vis[i]=1
    for i in product_to_recommend:
        lol=recommend_products(i,40//n)
        for x,y in zip(lol['ProductTitle'],lol['ProductId']):
            if(y  in vis):
                continue
            vis[y]=1
            ans.append((x,y))
            if(len(ans)>=20):
                break
        if(len(ans)>=20):
                break
        

    # recommendations = recommend_products(2732)
    # print(type(recommendations))
    return jsonify({'result': ans})

# %%


# %%



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)