import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getOnePatient,
    deletePatient,
    addVetToAPatient
} from "../services/patientService";

import { getAllVets } from "../../vet/services/vetService";
import UserContext from "../../../UserContext";

import "../patient.scss";

export default function PatientDetails() {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showVetModal, setShowVetModal] = useState(false);

    const [vets, setVets] = useState([]);
    const [selectedVet, setSelectedVet] = useState(null);
    const [vetError, setVetError] = useState(null);

    const { user } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // ---------------- FETCH PATIENT ----------------
    async function loadPatient(patientId) {
        try {
            setLoading(true);
            const data = await getOnePatient(patientId);
            setPatient(data);
        } catch (err) {
            setError("Failed to load patient.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        loadPatient(id);
    }, [id]);

    // load veterinara
    useEffect(() => {
        async function loadVets() {
            try {
                const data = await getAllVets();
                setVets(data);
            } catch (err) {
                setVetError("Failed to load vets");
            }
        }

        loadVets();
    }, []);

    useEffect(() => {
        if (vets.length === 0) return;
        if (user?.role !== "Vet") return;

        const vet = vets.find(v => v.username === user.sub);
        if (vet) setSelectedVet(String(vet.id));
    }, [vets, user]);

    // delete
    async function handleDelete(patientId) {
        try {
            await deletePatient(patientId);
            setShowModal(true);
        } catch (err) {
            setError("Failed to delete patient.");
        }
    }

    // vet modal
    function openVetModal() {
        if (patient?.vetId) {
            setSelectedVet(patient.vetId);
        }
        setShowVetModal(true);
    }

    // dodela veterinara
    async function handleAssignVet() {
        try {
            await addVetToAPatient(patient.id, Number(selectedVet));

            const updated = await getOnePatient(id);
            setPatient(updated);

            setShowVetModal(false);
        } catch (err) {
            setVetError("Failed to assign vet");
        }
    }

    // formatiranje datuma
    function formatDate(date) {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-US");
    }


    if (loading) return <div className="patient-page">Loading patient...</div>;
    if (error) return <div className="patient-page">{error}</div>;

    return (
        <div className="patient-page">

            {/* PATIENT VIEW */}
            {!showModal && (
                <div className="patient-details">

                    {!patient ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h2>{patient.name}</h2>

                            <p><b>Animal:</b> {patient.animalSpecie}</p>
                            <p><b>Date of birth:</b> {formatDate(patient.dateOfBirth)}</p>
                            <p><b>Owner:</b> {patient.ownerFullName}</p>

                            <p>
                                <b>Vet:</b>{" "}
                                {patient.vetFullName
                                    ? patient.vetFullName
                                    : "No assigned vet"}
                            </p>

                            {!patient.vetFullName && (
                                <button onClick={openVetModal}>
                                    Add vet to this patient
                                </button>
                            )}
                        </>
                    )}

                    <button onClick={() => handleDelete(patient.id)}>
                        Delete
                    </button>

                    <button onClick={() => navigate(`/vet-assistant/patients/${patient.id}/update-patient`)}>
                        Update
                    </button>

                    <button onClick={() => navigate(-1)} id="go-back">
                        ⬅ Go back
                    </button>

                </div>
            )}

            {/* DELETE MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Patient successfully deleted</h3>

                        <button
                            onClick={() =>
                                navigate("/vet-assistant/patient-list")
                            }
                        >
                            Back to list
                        </button>
                    </div>
                </div>
            )}

            {/* VET MODAL */}
            {showVetModal && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Assign Vet</h3>

                        {vetError && <p>{vetError}</p>}

                        <select
                            value={selectedVet !== null ? String(selectedVet) : ""}
                            onChange={(e) => setSelectedVet(e.target.value)}
                        >
                            <option value="">Select vet</option>
                            {vets.map(v => (
                                <option key={v.id} value={String(v.id)}>
                                    {v.fullName}
                                </option>
                            ))}
                        </select>

                        <div className="modal-actions">

                            <button onClick={handleAssignVet}>
                                Save
                            </button>
                            <button onClick={() => setShowVetModal(false)}>
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}