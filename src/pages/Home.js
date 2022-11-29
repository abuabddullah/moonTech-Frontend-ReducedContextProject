import React from "react";
import ProductCard from "../components/ProductCard";
import { useProductsHook } from "../contexts/ProductsProvider";

const Home = () => {
  const {
    state: { products, loading, error },
    dispatch,
  } = useProductsHook();

  // handle loading and error
  let content;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>Error</div>;
  } else if (!loading && !error && products.length === 0) {
    content = <div>No products found</div>;
  } else {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  }
  return (
    <>
      <h1 className="text-3xl text-center font-semibold">
        This is home page || total products : {products.length}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
        {content}
      </div>
    </>
  );
};

export default Home;
