import React, { useState, useEffect } from "react";
import { updatePatient, getOnePatient } from "../services/patientService";
import { data, useNavigate, useParams } from "react-router-dom";
import "../patient.scss";


const animalSpecies = [
    { id: 1, name: "Pas" },
    { id: 2, name: "Mačka" },
    { id: 3, name: "Papagaj" },
    { id: 4, name: "Kornjača" },
    { id: 5, name: "Zec" },
    { id: 6, name: "Hrčak" }
];

export default function UpdatePatientForm({
    onSuccess,
    onCancel
}) {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        animalSpecieId: "",
        dateOfBirth: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadPatient() {
            try {
                const exisingPatient = await getOnePatient(id);
                setFormData({
                    name: exisingPatient.name,
                    animalSpecie: exisingPatient.animalSpecie,
                    dateOfBirth: exisingPatient.dateOfBirth
                        ? exisingPatient.dateOfBirth.split("T")[0] : ""
                });
            } catch (error) {
                setError("Faild to load patien.");
            }
        }
        if (id) loadPatient();
    }, [id]);


    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }


    async function handleSubmit() {
        if (
            !formData.name ||
            !formData.animalSpecieId ||
            !formData.dateOfBirth
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
        };

        try {

            await updatePatient(id, payload);
            setSuccess("Patient edit successfully!");

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

                <h2>Edit Patient</h2>

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
                            : "Edit Patient"}
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