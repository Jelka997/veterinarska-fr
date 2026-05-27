import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './UserContext';
import Header from './core/layout/Header';
import Home from './core/layout/Home';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Profile from './features/users/Profile';
import PatientForm from './features/patients/components/patientForm';
import VetDashboard from './features/vet/components/VetDashboard'; 
import PatientList from './features/patients/components/patientList.jsx';
import PatientDetails from './features/patients/components/PatientDetails.jsx';
import UpdatePatientForm from './features/patients/components/UpdatePatientForm.jsx';
import VetList from './features/vet/components/VetList.jsx';
import './core/global.scss';
import ExaminationList from './features/examinations/components/ExaminationList.jsx';
import ExaminationForm from './features/examinations/components/ExaminationForm.jsx';

const App = () => {
  let token = localStorage.getItem('token');
  if(token) token = JSON.parse(atob(token.split('.')[1]));
  const [user, setUser] = useState(token);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vet-assistant" element={<VetDashboard />} />
            <Route path="/vet-assistant/add-patient" element={<PatientForm />} />
            <Route path="/vet-assistant/patient-list" element={<PatientList />} />
            <Route path="/vet-assistant/Patients/:id/patient-details" element={<PatientDetails />} />
            <Route path="/vet-assistant/Patients/:id/update-patient" element={<UpdatePatientForm />} />
            <Route path="/vet-assistant/vet-list" element={<VetList />} />
            <Route path="/vet-assistant/:id/examinations" element={<ExaminationList />} />
            <Route path="/vet-assistant/:id/create-examination" element={<ExaminationForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
