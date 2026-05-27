import React, { useEffect, useState } from "react";
import { getOneVet } from "../../vet/services/vetService.js";
import { useNavigate, useParams } from "react-router-dom";
import '../examination.scss';


export default function ExaminationForm() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    async function loadVet() {
        try {
            setLoading(true);
            const data = await getOneVet(id);
            setPatients(data.patients);
        } catch (error) {
            setError("Failed to load patients for this vet.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVet();
    }, []);

    if (loading) return <div className="vets-page">Loading...</div>;
    if (error) return <div className="vets-page">{error}</div>;
    function formatDate(date) {
        if (!date) return "";

        return new Date(date)
            .toLocaleDateString("en-US");
    }

    return (
        <div className="exam-page">
            <div className="exam-layout">
                <div className="exam-content">
                    <div className="exam-grid">
                        {patients.map((patient) => (
                            <div className="patient-card" >
                                <div className="patient-card-content">
                                    <h3 className="patient-card-name">{patient.name}</h3>
                                    <p className="patient-card-dateOfBirth">Date of birth: {formatDate(patient.dateOfBirth)}</p>
                                    <p className="patient-card-animal">Animal Specie: {patient.animalSpecie}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}