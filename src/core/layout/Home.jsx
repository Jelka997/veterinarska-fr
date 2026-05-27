import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import '../../core/global.scss';
import './layout.scss';
import {getRole} from '../../utils/auth';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const role = getRole(user);

  useEffect(() => {
    if (user) {
      if (role === 'Vet' || role === 'Assistant') navigate('/vet-assistant');
    }
  }, [user]);

  return (
    <div className="home-container">
      <h1>Dobrodošli!</h1>
      {!user && (
        <p className="welcome-text">
          Prijavi se da pristupiš funkcionalnostima.
        </p>
      )}
    </div>
  );
};

export default Home;