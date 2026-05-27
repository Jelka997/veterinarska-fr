import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../UserContext';
import {getRole} from '../../../utils/auth';
import '../vet.scss';

export default function VetDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const role = getRole(user);
  
   const cards = useMemo(() => {
    const base = [
      {
        title: "Add Patient",
        description: "Register a new patient 🐾",
        path: "/vet-assistant/add-patient"
      },
      {
        title: "List Of Patients",
        description: "See all patients info",
        path: "/vet-assistant/patient-list"
      },
    ];

    if (user && role === 'Assistant') {
      base.push({
        title: "List Of Vets",
        description: "See list of vets",
        path: "/vet-assistant/vet-list"
      });
    }

    return base;
  }, [user, role]);

  return (
    <div className="dashboard-wrap">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.path}
            className="dashboard-card"
            onClick={() => navigate(card.path)}
          >
            <span className="card-icon"></span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}