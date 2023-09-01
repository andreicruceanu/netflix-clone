import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";
import HomePage from "./pages/home/HomePage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
