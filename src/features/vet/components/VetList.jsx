import React, { useEffect, useState } from "react";
import { getAllVets } from "../services/vetService.js";
import VetCard from "../components/VetCard.jsx";
import { useNavigate } from "react-router-dom";
import "../vet.scss";

export default function VetList() {
    const [vets, setVets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function loadVets() {
        try {
            setLoading(true);
            const data = await getAllVets();
            setVets(data);
        } catch (error) {
            setError("Failed to load vets.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadVets();
    }, []);

    if (loading) {
        return <div className="vets-page">Loading vets...</div>;
    }

    if (error) {
        return <div className="vets-page">{error}</div>;
    }

    return (
        <div className="vets-page">
            <div className="vets-layout">
                <div className="vets-content">
                    <div className="vets-grid">
                        {vets.map((vet) => (
                            <VetCard
                                key={vet.id}
                                fullName={vet.fullName}
                                username={vet.username}
                                email={vet.email}
                                onClick={() => navigate(`/vet-assistant/${vet.id}/examinations`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}