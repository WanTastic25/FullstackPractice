import { useEffect, useState } from "react";
import HeroList from './HeroList.jsx';
import AddHero from "./AddHero.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <div>
            <HeroList />
            <AddHero />
        </div>
    )
}
