import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import "react-multi-carousel/lib/styles.css";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
