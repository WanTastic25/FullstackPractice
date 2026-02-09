import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HeroList from './HeroList.jsx';
import AddHero from "./AddHero.jsx";
import UpdateHero from "./UpdateHero.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    const navigate = useNavigate(); // must be inside a component

    return (
        <div>
            <button onClick={() => navigate("/")}>Hero List</button>
            <button onClick={() => navigate("/hero/add")}>Add Hero</button>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="/heroes/list" replace />} />
                <Route path="/heroes/list" element={<HeroList />} />
                <Route path="/hero/add" element={<AddHero />} />
                <Route path="/hero/update/:id" element={<UpdateHero />} />
            </Routes>
        </Router>
    )
}
