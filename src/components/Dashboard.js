import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate('/'); // Redirect to login if no access token
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/students/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setStudents(response.data);
            } catch (error) {
                console.error(error);
                navigate('/'); // Redirect to login if unauthorized
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Students</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.user?.username} - {student.student_class?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;