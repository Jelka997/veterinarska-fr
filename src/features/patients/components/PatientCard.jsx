import React from "react";

export default function PatientCard(props) {
    function formatDate(date) {
    if (!date) return "";

    return new Date(date)
        .toLocaleDateString("en-US");
}
    return (
        <div className="patient-card" onClick={props.onClick}>
            <div className="patient-card-content">
                <h3 className="patient-card-name">{props.name}</h3>
                <p className="patient-card-dateOfBirth">Date of birth: {formatDate(props.dateOfBirth)}</p>
                <p className="patient-card-animal">Animal Specie: {props.animalSpecie}</p>
                <p className="patient-card-owner">Owner: {props.ownerFullName}</p>
                <p className="patient-card-vet">Vet: {props.vetFullName}</p>
            </div>
        </div>
    )
}
