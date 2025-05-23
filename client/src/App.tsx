import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//pages
import Login from "./pages/Login";
// import Home from "./pages/Home";
import Hub from "./Hub";
//

import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Hub />} />
      </Routes>
    </Router>
  );
};

export default App;
