import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { lazy } from "react";

import { CityiesContext } from "./context/CityiesContext";
import { FakeAuthContext } from "./context/FakeAuthContext";
import ProtectedRouted from "./page/ProtectedRouted";

// import City from "./compoents/City";
// import Product from "./page/Product";
// import Pricing from "./page/Pricing";
// import Homepage from "./page/Homepage";
// import PageNotFound from "./page/PageNotFound";
// import AppLayout from "./page/AppLayout";

// import Login from "./page/Login";
import CityList from "./compoents/CityList";
import CountryList from "./compoents/CountryList";
import Form from "./compoents/Form";
import SpinnerFullPage from "./compoents/SpinnerFullPage";

//waback和vite看到这个lazy就会分包
const Homepage = lazy(() => import("./page/Homepage"));
const Pricing = lazy(() => import("./page/Pricing"));
const Product = lazy(() => import("./page/Product"));
const City = lazy(() => import("./compoents/City"));
const PageNotFound = lazy(() => import("./page/PageNotFound"));
const AppLayout = lazy(() => import("./page/AppLayout"));
const Login = lazy(() => import("./page/Login"));
function App() {
  return (
    <CityiesContext>
      <FakeAuthContext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/app"
                element={
                  <ProtectedRouted>
                    <AppLayout />
                  </ProtectedRouted>
                }
              >
                <Route
                  index
                  element={<Navigate to="cities" replace></Navigate>}
                ></Route>
                <Route path="cities" element={<CityList />}></Route>
                <Route path="cities/:id" element={<City />}></Route>
                <Route
                  path="countries"
                  element={<CountryList></CountryList>}
                ></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FakeAuthContext>
    </CityiesContext>
  );
}

export default App;
