import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
// import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route exact path="/" element={<Homepage/>}/>
      <Route exact path="/coins/:id" element={<CoinPage/>}/>
    </Routes>
</Router>
</>
  );
}

export default App;
