import Product from "../model/productSchema.js";
import Connection from "../database/db.js";

import csv from "csvtojson";
import Promise from "promise";

const driver = async () => {
  const csvFilePath = `./../../data.csv`;

  await Connection();
  const products = await csv().fromFile(csvFilePath);
  let counter = 1;

  await Promise.all(
    products.map(async (product) => {
      //   console.log(product);

      const p = new Product({
        id: product.ProductId,
        url: product.ImageURL,
        detailUrl: product.ImageURL,
        description:
          "nvkn cdknc kjnclxn xlnvlkmv dvlknvljdnvmd ljnv dlnvlkdmv d",
        title: product.ProductTitle,
        category: product.Category,
        subCategory: product.SubCategory,
        productType: product.ProductType,
        noPurchases: product.no_purchase,
        price: product.retail_price,
        discount: Math.ceil(Math.random() * 35),
      });

      await p.save();
      console.log(counter++);
    })
  );
};

driver();
