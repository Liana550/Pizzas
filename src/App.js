import { Route, Routes } from "react-router-dom";
import HomeLayouts from "./layouts/HomeLayouts";
import { Home, FullDecPizza, Cart, NotFound } from "./pages/index";
import { CustomNotification } from "./Components";
import "./App.css";
function App() {
  console.log("render App");
  return (
    <div className="App">
      <div className="app_content">
        <Routes>
          <Route path="/" element={<HomeLayouts />}>
            <Route index element={<Home />} />
            <Route path="/pizzas/:id" element={<FullDecPizza />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <CustomNotification />
      </div>
    </div>
  );
}

export default App;
