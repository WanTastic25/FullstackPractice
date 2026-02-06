import { useRef } from "react";

function AddHero() {
    const nameRef = useRef();
    const positionRef = useRef();
    const healthRef = useRef();
    const manaRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        } catch {

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" ref={nameRef} placeholder="Hero name" required />
            </div>

            <div>
                <label>Position:</label>
                <input type="text" ref={positionRef} placeholder="Position" required />
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
    )
}

export default AddHero;