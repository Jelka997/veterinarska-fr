import React, { useEffect, useState } from "react";
import { getOneVet } from "../../vet/services/vetService.js";
import { useNavigate, useParams } from "react-router-dom";
import ExaminationCard from "./ExaminationCard.jsx";
import "../examination.scss";

export default function ExaminationList() {
    const [examinations, setExaminations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    async function loadVet() {
        try {
            setLoading(true);
            const data = await getOneVet(id);
            setExaminations(data.examinations);
        } catch (error) {
            setError("Failed to load examinations.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVet();
    }, []);

    if (loading) return <div className="vets-page">Loading...</div>;
    if (error) return <div className="vets-page">{error}</div>;

    return (
        <div className="exam-page">
            <div className="exam-layout">
                <div className="exam-content">
                    <div className="exam-grid">
                        {examinations.map((examination) => (
                            <ExaminationCard
                                key={examination.id}
                                name={examination.name}
                                examinationDate={examination.examinationDate}
                                animalSpecie={examination.animalSpecie}
                                age={examination.age}
                            />
                        ))}
                        <button onClick={() => navigate(`/vet-assistant/${id}/create-examination`)}>Add Examination</button>
                    </div>
                </div>
            </div>
        </div>
    );
}