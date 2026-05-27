import React from "react";

export default function ExaminationCard(props) {
    function formatDate(date) {
        if (!date) return "";

        return new Date(date)
            .toLocaleDateString("en-US");
    }
    return (
        <div className="exam-card">
            <div className="exam-card-content">
                <h3 className="exam-card-name">{props.name}</h3>
                <p>Examination Date: {formatDate(props.examinationDate)}</p>
                <p>Animal Specie: {props.animalSpecie}</p>
                <p>Age: {props.age}</p>
            </div>
        </div>
    );
}