import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import MY_NFT from "./components/MY_NFT/MY_NFT";
import Mint from "./components/Mint/Mint";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        limit={1}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/myNFT" element={<MY_NFT />} />
          <Route path="/mint" element={<Mint />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
