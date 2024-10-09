import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import ProductForm from "./pages/ProductForm";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/productdetails/:chipNumber" element={<ProductDetails />} />
      <Route path="/productform" element={<ProductForm />} />
      <Route path="/edit/:chipNumber" element={<ProductForm />} />
      <Route path="*" element={<ErrorPage
       />}/>

    {/*   <Route path="/contact" element={<Contact />} />
<Route path="/about" element={<About />} /> */}{/* kommer att användas senare om jag hinner */}
    </Route>
  )
);