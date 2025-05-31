import "./App.scss"
import { Routes, Route } from "react-router";
import { StorePage } from "@pages/store-page"
import { UserPage } from "@pages/user-page"


export const App = () => (
  <Routes>
    <Route path="/" element={<StorePage />} />
    <Route path="/user" element={<UserPage />} />
  </Routes>
)
