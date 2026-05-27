import React from "react";

export default function VetCard(props) {
    return (
        <div className="vet-card" onClick={props.onClick}>
            <div className="vet-card-content">
                <h3 className="vet-card-fullName">{props.fullName}</h3>
                <p className="vet-card-username">Username: {props.username}</p>
                <p className="vet-card-email">Email: {props.email}</p>
            </div>
        </div>
    )
}
