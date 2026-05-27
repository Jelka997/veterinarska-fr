import React, { useState, useEffect } from "react";
import { createPatient, updatePatient } from "../services/patientService";
import { useNavigate } from "react-router-dom";
import "../patient.scss";


const animalSpecies = [
    { id: 1, name: "Pas" },
    { id: 2, name: "Mačka" },
    { id: 3, name: "Papagaj" },
    { id: 4, name: "Kornjača" },
    { id: 5, name: "Zec" },
    { id: 6, name: "Hrčak" }
];

export default function PatientForm({
    onSuccess,
    onCancel
}) {

    const [formData, setFormData] = useState({
        name: "",
        animalSpecieId: "",
        dateOfBirth: "",
        ownerUsername: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit() {
        if (
            !formData.name ||
            !formData.animalSpecieId ||
            !formData.dateOfBirth ||
            !formData.ownerUsername
        ) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            name: formData.name,
            animalSpecieId: formData.animalSpecieId,
            dateOfBirth: new Date(
                formData.dateOfBirth
            ).toISOString(),
            ownerUsername: formData.ownerUsername
        };

        try {

            await createPatient(payload);
            setSuccess("Patient added successfully!");

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            const data = err.response?.data;

            if (data?.errors) {
                setError(
                    Object.values(data.errors)
                        .flat()
                        .join(", ")
                );
            } else {
                setError(
                    data ||
                    "Something went wrong."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="patient-form-wrap">
            <div className="patient-form">

                <h2>Add Patient</h2>

                <div className="patient-divider" />

                <div className="patient-grid">

                    <div className="field">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Patient name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Animal specie</label>

                        <select
                            name="animalSpecieId"
                            value={formData.animalSpecieId}
                            onChange={handleChange}
                        >
                            <option value="">
                                Choose animal
                            </option>

                            {animalSpecies.map(specie => (
                                <option
                                    key={specie.id}
                                    value={specie.id}
                                >
                                    {specie.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <label>Date of birth</label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Owner</label>

                        <input
                            type="text"
                            name="ownerUsername"
                            placeholder="Owner username"
                            value={formData.ownerUsername}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <div className="patient-form-actions">

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="btn-submit"
                    >
                        {loading
                            ? "Saving..."
                            : "Add Patient"}
                    </button>

                </div>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="success">
                        {success}
                    </p>
                )}

            </div>
            <button onClick={() => navigate(-1)} id="go-back">
                ⬅ Go back
            </button>
        </div>
    );
}