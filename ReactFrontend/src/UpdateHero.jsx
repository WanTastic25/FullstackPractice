import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateHero() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hero, setHero] = useState({
        name: "",
        position: "",
        health: 0,
        mana: 0
    });

    useEffect(() => {
        fetch(`http://localhost:5154/api/Heroes/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setHero(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setHero(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:5154/api/Heroes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hero)
        })
            .then(res => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then(() => {
                alert("Hero updated!");
                navigate("/");
            })
            .catch(err => alert(err.message));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Update Hero</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={hero.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Position</label>
                    <select
                        name="position"
                        value={hero.position}
                        onChange={handleChange}
                    >
                        <option value="">Select Position</option>
                        <option value="Pos 1">Pos1</option>
                        <option value="Pos 2">Pos2</option>
                        <option value="Pos 3">Pos3</option>
                        <option value="Pos 4">Pos4</option>
                        <option value="Pos 5">Pos5</option>
                    </select>
                </div>

                <div>
                    <label>Health</label>
                    <input
                        type="number"
                        name="health"
                        value={hero.health}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Mana</label>
                    <input
                        type="number"
                        name="mana"
                        value={hero.mana}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateHero;