import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import DogList from "./pages/DogList";
import DogDetails from "./pages/DogDetails";
import DogForm from "./pages/DogForm";
import Login from "./pages/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<Home />} />
      <Route path="/doglist" element={<DogList />} />
      <Route path="/dogdetails/:chipNumber" element={<DogDetails />} />
      <Route path="/dogform" element={<DogForm />} />
      <Route path="/edit/:chipNumber" element={<DogForm />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="*" element={<ErrorPage
       />}/>

    {/*   <Route path="/contact" element={<Contact />} />
<Route path="/about" element={<About />} /> */}{/* kommer att användas senare om jag hinner */}
    </Route>
  )
);