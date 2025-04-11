import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import "react-multi-carousel/lib/styles.css";
import { StoreLocator } from "./pages/store-locator";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store-locator" element={<StoreLocator />} />
      </Routes>
    </BrowserRouter>
  );
}
