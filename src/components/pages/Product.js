import classes from "./Product.module.css";
import BannerShop from "../banner/BannerShop";
// import { useParams } from "react-router-dom";
import ProductTable from "../product/product-table";
// import useHTTP from "../hooks/use-http";
import { useEffect, useState } from "react";
import { deleteProductAPI, getAllProductAPI } from "./lib/api-product";
import { useSelector, useDispatch } from "react-redux";

const Product = () => {
  const { productList } = useSelector((state) => state.productReducer);
  // console.log("CHECK LISTPRODUCT: ", productList);
  const dispatch = useDispatch();
  // const { data, status, error, sendRequest } = useHTTP(getProducts);
  // const { data = dataDelte, status, error, sendRequest } = useHTTP(getProducts);
  // const [products, setProducts] = useState(null);
  useEffect(() => {
    dispatch(getAllProductAPI());
  }, []);
  // useEffect(() => {
  //   setProducts(productList);
  // }, [productList]);

  // search function
  const searchProductHandler = (e) => {
    // // search product by name
    // const searchResult = data.filter((item) => {
    //   return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    // });
    // // set product to showup
    // setProducts(searchResult);
  };
  // crud handler
  const crudHandler = (type, productId) => {
    // console.log("index: ", index);
    if (type === "delete") {
      // data.splice(index, 1);
      // setProducts([...data]);
      dispatch(deleteProductAPI(productId));
    }
    if (type === "update") {
      // const searchResult=data.filter(item=>item._id!==payload)
      // setProducts(searchResult)
      // return
    }
  };
  return (
    <div className={classes["product-container"]}>
      <BannerShop text={{ left: "ADMIN", right: "ADMIN" }} />
      <div className={classes["product-content"]}>
        <div>
          <h4>Products</h4>
          <input
            type="text"
            placeholder="Enter search"
            onChange={searchProductHandler}
          />
        </div>
        <div className={classes["product-table-container"]}>
          {productList.length > 0 && (
            <ProductTable products={productList} crud={crudHandler} />
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
