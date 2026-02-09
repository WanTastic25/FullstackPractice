import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddHero() {
    const navigate = useNavigate();
    const nameRef = useRef();
    const positionRef = useRef();
    const healthRef = useRef();
    const manaRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const heroData = {
            Name: nameRef.current.value,
            Position: positionRef.current.value,
            Health: Number(healthRef.current.value),
            Mana: Number(manaRef.current.value),
        }

        try {
            const response = await fetch("http://localhost:5154/api/heroes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(heroData),
            });

            if (!response.ok) throw new Error("Failed to add hero");

            const data = await response.json();
            console.log("Hero added:", data);
            alert("Hero added successfully!");

            navigate("/")

        } catch {

        }
    }

    return (
        <div>
            <h2>Add New Hero</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" ref={nameRef} placeholder="Hero name" required />
                </div>

                <div>
                    <label>Position:</label>
                    <select
                        name="position"
                        ref={positionRef}
                        required
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
                    <label>Health:</label>
                    <input type="number" ref={healthRef} placeholder="100" required />
                </div>

                <div>
                    <label>Mana:</label>
                    <input type="number" ref={manaRef} placeholder="50" required />
                </div>

                <button type="submit">Add Hero</button>
            </form>
        </div>
    )
}

export default AddHero;