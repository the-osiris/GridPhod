import React, { useEffect } from "react";

import { Box, styled } from "@mui/material";

// import NavBar from "./Home/NarBar";
import Banner from "./Home/Banner";
import MidSlide from "./Home/MidSlide";
import MidSection from "./Home/MidSection";
import Slide from "./Home/Slide";

import { useSelector, useDispatch } from "react-redux"; // hooks
import {
  getDod as listDod,
  getProducts as listProducts,
  getTopSel as listTopSel,
  getFootw as listFootw,
  getAppar as listAppar,
} from "../redux/actions/productActions";

const Component = styled(Box)`
  padding: 20px 10px;
  background: #f2f2f2;
`;

const Home = () => {
  const getProducts = useSelector((state) => state.getProducts);
  const getDod = useSelector((state) => state.getDod);
  const getTopSel = useSelector((state) => state.getTopSel);
  const getFootw = useSelector((state) => state.getFootw);
  const getAppar = useSelector((state) => state.getAppar);
  const { products } = getProducts;
  const { dod } = getDod;
  const { topsell } = getTopSel;
  const { footw } = getFootw;
  const { appar } = getAppar;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listDod());
    dispatch(listTopSel());
    dispatch(listFootw());
    dispatch(listAppar());
  }, [dispatch]);

  return (
    <>
      <Component>
        <Banner />
        <MidSlide products={dod} />
        <MidSection />
        <Slide
          data={topsell}
          title="Top Selection"
          timer={false}
          multi={true}
        />
        <Slide data={footw} title="Footwear" timer={false} multi={true} />
        <Slide data={appar} title="Apparel" timer={false} multi={true} />
        <Slide
          data={products}
          title="Recommended Items"
          timer={false}
          multi={true}
        />
      </Component>
    </>
  );
};

export default Home;
