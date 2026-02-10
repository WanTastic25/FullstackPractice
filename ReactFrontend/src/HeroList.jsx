import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroList.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function HeroList() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function FetchHeroes() {
        setLoading(true);

        fetch("http://localhost:5154/api/Heroes")
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setHeroes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        FetchHeroes();
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:5154/api/Heroes/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Delete failed");
                return res.json();
            })
            .then(() => {
                alert("Hero Deleted!");
                FetchHeroes();
            })
            .catch(err => alert(err.message));

    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <div className="tableTitle">
                <h1 className="basicText">Dota2 Heroes List</h1>
            </div>
            <div className="tableContainer">
                <table className="table table-dark table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Hero ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Health</th>
                            <th>Mana</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map(hero => (
                            <tr key={hero.id}>
                                <td>{hero.id}</td>
                                <td>{hero.name}</td>
                                <td>{hero.position}</td>
                                <td>{hero.health}</td>
                                <td>{hero.mana}</td>
                                <td>
                                    <Link to={`/hero/update/${hero.id}`}>
                                        <button className="editButton baseButton">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                    </Link>
                                    <button className="deleteButton baseButton" onClick={() => handleDelete(hero.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HeroList;