import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashBoard: React.FC = () => {
    const navigate = useNavigate() 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/v1/auth/protectDashBoard' , {
                    withCredentials: true } );

                if (res.status === 401) {
                    navigate('/');
                }
            } catch (err) {
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);
  return (
    <div className='  backgroundImage w-screen h-screen flex items-center justify-center'>    
      DashBoard
      <div>
      </div>
    </div>   
  );
};

export default DashBoard;