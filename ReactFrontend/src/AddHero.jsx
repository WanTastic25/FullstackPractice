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
        <div className="tableCard d-flex justify-content-center flex-column p-5 m-5">
            <h2 className="basicText">Add New Hero</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label basicText">Name:</label>
                    <input className="form-control" type="text" ref={nameRef} placeholder="Hero name" required />
                </div>

                <div>
                    <label className="form-label basicText">Position:</label>
                    <select
                        className="form-select"
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
                    <label className="form-label basicText">Health:</label>
                    <input className="form-control" type="number" ref={healthRef} placeholder="100" required />
                </div>

                <div>
                    <label className="form-label basicText">Mana:</label>
                    <input className="form-control" type="number" ref={manaRef} placeholder="50" required />
                </div>

                <button className="btn btn-success mt-3" type="submit">Add Hero</button>
                <button className="btn btn-danger ms-2 mt-3" type="reset">Reset</button>
            </form>
        </div>
    )
}

export default AddHero;