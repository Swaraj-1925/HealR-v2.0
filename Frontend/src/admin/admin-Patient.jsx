import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function AdminPatient() {
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'appointments', headerName: 'Appointments', width: 200 },
        { field: 'reviews', headerName: 'Reviews', width: 200 },
        { field: 'discord', headerName: 'Discord', width: 130 },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/Patient_list'); // Adjust the endpoint according to your backend route
            const data = response.data;
            const formattedRows = data.map((item, index) => ({
                id: index + 1,
                name: item.name,
                username: item.username || item.patientUsername,
                age: item.age,
                gender: item.gender,
                appointments: item.appointments ? item.appointments.length : 0,
                reviews: item.reviews ? item.reviews.length : 0,
                discord: item.discord || false,
            }));
            setRows(formattedRows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div style={{ height: 400, width: '90%',display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center', margin:'5vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    pagination
                />
            </div>
        </>
    );
}

export default AdminPatient;
