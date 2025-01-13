import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../componets/kanban';
const base_url = import.meta.env.VITE_BASE_API_URL 

const DashBoard: React.FC = () => {
    const navigate = useNavigate() 
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${base_url}/auth/protectDashBoard` , {
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
    <div className=' w-screen h-screen flex items-center justify-center'>    
        <KanbanBoard/>
    </div>   
  );
};

export default DashBoard;