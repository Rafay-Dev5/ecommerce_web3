import { Buyer } from "./pages/buyer";
import { Seller } from "./pages/seller";
import Home from "./pages/home";
import Template from "./template";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<Template />}> */}
        <Route
          exact
          path="/"
          element={
            <>
              <Template />
              <Home />
            </>
          }
        />
        <Route
          path="/seller"
          element={
            <>
              <Template />
              <Seller />
            </>
          }
        />
        <Route
          path="/buyer"
          element={
            <>
              <Template />
              <Buyer />
            </>
          }
        />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
