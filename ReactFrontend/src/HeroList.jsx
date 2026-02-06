import React, { useState, useEffect } from "react";

function HeroList() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
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
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Dota2 Heroes List</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Hero ID</th>
                        <th>Portrait</th>
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
                                <td>Portrait</td>
                                <td>{hero.name}</td>
                                <td>{hero.position}</td>
                                <td>{hero.health}</td>
                                <td>{hero.mana}</td>
                                <td>
                                    Update, Delete, Read Goes Here
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default HeroList;