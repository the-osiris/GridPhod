import Product from "../model/productSchema.js";

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({}).limit(10);
    // console.log(products);

    response.json(products);
  } catch (error) {}
};

export const getDod = async (request, response) => {
  try {
    const dod = await Product.find({}).sort({ discount: -1 }).limit(10);
    // console.log(dod);

    response.json(dod);
  } catch (error) {}
};

export const getTopSel = async (request, response) => {
  try {
    const topSel = await Product.find({}).sort({ noPurchases: -1 }).limit(10);
    // console.log(topSel);

    response.json(topSel);
  } catch (error) {}
};

export const getFootw = async (request, response) => {
  try {
    const footW = await Product.find({ category: "Footwear" })
      .sort({ discount: -1 })
      .limit(20);
    // console.log(footW);

    response.json(footW);
  } catch (error) {}
};

export const getAppar = async (request, response) => {
  try {
    const appar = await Product.find({ category: "Apparel" })
      .sort({ discount: -1 })
      .limit(20);
    // console.log(appar);

    response.json(appar);
  } catch (error) {}
};

export const getProductById = async (request, response) => {
  try {
    const products = await Product.findOne({ id: request.params.id });
    response.json(products);
  } catch (error) {}
};
