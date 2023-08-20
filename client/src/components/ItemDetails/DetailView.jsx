import { useState, useEffect } from "react";

import { styled, Box, Typography, Grid } from "@mui/material";

import ProductDetail from "./ProductDetail";
import ActionItem from "./ActionItem";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";

import { getProductDetails } from "../../redux/actions/productActions";
import axios from "axios";

const Component = styled(Box)`
  margin-top: 55px;
  background: #f2f2f2;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#FFFFFF",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
  & > p {
    margin-top: 10px;
  }
`;

const DetailView = () => {
  const [visit, setVisit] = useState([{}]);

  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const { id } = useParams();

  const postVisitItems = async (id, time, username) => {
    console.log("Deepak");
    try {
      console.log();
      await axios.post(`http://localhost:8000/visit`, {
        id: id,
        time: time,
        username: username,
      });
    } catch {
      console.log("Error");
    }
  };

  const { loading, product } = useSelector((state) => state.getProductDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product && id !== product.id) dispatch(getProductDetails(id));
    // console.log(product.id);
  }, [dispatch, product, id, loading]);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const timeSpent = endTime - startTime;

      // setVisit([{ id: product.id, time: timeSpent, username: "jungliepanda" }]);
      // console.log(visit);
      // console.log(product);
      postVisitItems(product.id, timeSpent, "kunal");
    };
  }, []);

  return (
    <Component>
      <Box></Box>
      {product && Object.keys(product).length && (
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItem product={product} />
          </Grid>
          <RightContainer item lg={8} md={8} sm={8} xs={12}>
            <Typography>{product.title}</Typography>
            <Typography
              style={{ marginTop: 5, color: "#878787", fontSize: 14 }}
            >
              8 Ratings & 1 Reviews
              <span>
                <img src={fassured} style={{ width: 77, marginLeft: 20 }} />
              </span>
            </Typography>
            <Typography>
              <span style={{ fontSize: 28 }}>
                ₹{product.price - (product.price * product.discount) / 100}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#878787" }}>
                <strike>₹{product.price}</strike>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#388E3C" }}>{product.discount}% off</span>
            </Typography>
            <ProductDetail product={product} />
          </RightContainer>
        </Container>
      )}
    </Component>
  );
};

export default DetailView;
