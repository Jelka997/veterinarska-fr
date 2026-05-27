import React, { useEffect, useState } from "react";
import { getFilteredSortedPatients } from "../services/patientService";
import PatientCard from "./PatientCard.jsx";
import { useNavigate } from "react-router-dom";
import "../patient.scss";

export default function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const pageSize = 10;
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        vetName: "",
        petName: "",
        animalSpecie: "",
        ageFrom: "",
        ageTo: ""
    });

    async function loadPatients(filters, page, pageSize) {
        try {
            setLoading(true);
            const data = await getFilteredSortedPatients(filters, page, pageSize);
            setPatients(data.items);
            setTotalItems(data.count);
            setHasNextPage(data.hasNextPage);
            setHasPreviousPage(data.hasPreviousPage);
        } catch (error) {
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    }

    function handleSearch() {
        setPage(1);
        loadPatients(filters, 1, 10);
    }


    function handleReset() {
        const emptyFilters = {
            vetName: "",
            petName: "",
            animalSpecie: "",
            ageFrom: "",
            ageTo: "",
        };

        setFilters(emptyFilters);
        setPage(1);
        loadPatients(emptyFilters, 1, 10);
    }


    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        loadPatients(filters, page, pageSize);
    }, [page]);

    if (loading) {
        return <div className="patients-page">Loading patients...</div>;
    }

    if (error) {
        return <div className="patients-page">{error}</div>;
    }

    return (
        <div className="patients-page">
            <div className="patients-layout">
                {/* LEVA STRANA - FILTERI */}
                <div className="patients-sidebar">
                    <h1>Patients</h1>

                    <div className="filter-group">
                        <label>Vet name</label>
                        <input
                            type="text"
                            placeholder="Search by vet..."
                            value={filters.vetName}
                            onChange={(e) => setFilters({ ...filters, vetName: e.target.value })}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Pet name</label>
                        <input
                            type="text"
                            placeholder="Search by pet..."
                            value={filters.petName}
                            onChange={(e) => setFilters({ ...filters, petName: e.target.value })}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Animal specie</label>
                        <input
                            type="text"
                            placeholder="Search by specie..."
                            value={filters.animalSpecie}
                            onChange={(e) => setFilters({ ...filters, animalSpecie: e.target.value })}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Age from</label>
                        <input
                            type="number"
                            placeholder=""
                            value={filters.ageFrom}
                            onChange={(e) => setFilters({ ...filters, ageFrom: e.target.value })}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Age to</label>
                        <input
                            type="number"
                            placeholder=""
                            value={filters.ageTo}
                            onChange={(e) => setFilters({ ...filters, ageTo: e.target.value })}
                        />
                    </div>

                    <button className="btn-search" onClick={handleSearch}>Search</button>
                    <button className="btn-reset" onClick={handleReset}>Reset</button>
                </div>

                {/* DESNA STRANA - KARTICE */}
                <div className="patients-content">
                    <div className="patients-grid">
                        {patients.map((patient) => (
                            <PatientCard
                                key={patient.id}
                                name={patient.name}
                                dateOfBirth={patient.dateOfBirth}
                                animalSpecie={patient.animalSpecie}
                                ownerFullName={patient.ownerFullName}
                                vetFullName={patient.vetFullName}
                                onClick={() => navigate(`/vet-assistant/patients/${patient.id}/patient-details`)}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        <button disabled={!hasPreviousPage} onClick={() => setPage(page - 1)}>Previous</button>
                        <span>{page} / {totalPages}</span>
                        <button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );

}