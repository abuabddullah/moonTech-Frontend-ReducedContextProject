import { RouterProvider } from "react-router-dom";
import ProductsProvider from "./contexts/ProductsProvider";
import routes from "./routes/routes";

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={routes} />
    </ProductsProvider>
  );
}

export default App;
