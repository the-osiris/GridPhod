import express from "express";
import {
  getProductById,
  getProducts,
  getDod,
  getTopSel,
  getAppar,
  getFootw,
} from "../controller/product-controller.js";
import {
  userSignUp,
  userLogIn,
  postVisitItems,
  postCartItems,
  postBuyItems,
} from "../controller/user-controller.js";
// import { addItemInCart } from '../controller/cart-controller.js';
import {
  addPaymentGateway,
  paymentResponse,
} from "../controller/payment-controller.js";

const router = express.Router();

//login & signup
router.post("/signup", userSignUp);
router.post("/login", userLogIn);

router.get("/products", getProducts);
router.get("/dod", getDod);
router.get("/topSel", getTopSel);
router.get("/footW", getFootw);
router.get("/appar", getAppar);
router.get("/product/:id", getProductById);

router.post("/visit", postVisitItems);
router.post("/cart", postCartItems);
router.post("/buy", postBuyItems);

router.post("/payment", addPaymentGateway);
router.post("/callback", paymentResponse);

export default router;
