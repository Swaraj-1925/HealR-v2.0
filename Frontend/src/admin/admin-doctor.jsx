import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function AdminDoctor() {
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'report', headerName: 'Report', width: 80 },
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'username', headerName: 'Username', width: 170 },
        { field: 'age', headerName: 'Age', type: 'number', width: 80 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'experience', headerName: 'Experience', type: 'number', width: 100 },
        { field: 'profession', headerName: 'Profession', width: 150 },
        { field: 'appointments', headerName: 'Appointments', width: 120 },
        { field: 'reviews', headerName: 'Reviews', width: 100 },
        { field: 'message', headerName: 'Message', width: 80 },
        { field: 'call', headerName: 'Call', width: 80 },
        { field: 'videoCall', headerName: 'VideoCall', width: 100 },
        { field: 'Clinic', headerName: 'Clinic', width: 100 },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/Doctor_list');
            const data = response.data;
            const formattedRows = data.map((item, index) => ({
                id: index + 1,
                name: item.name,
                username: item.username,
                age: item.age,
                gender: item.gender,
                experience: item.experience ? item.experience.years : 0,
                profession: item.experience ? item.experience.profession : '',
                appointments: item.appointments,
                reviews: item.reviews,
                message: item.fees ? item.fees.message : '',
                call: item.fees ? item.fees.call : '',
                videoCall: item.fees ? item.fees.videoCall : '',
                Clinic: item.fees ? item.fees.inClinic : '',
                report: item.reports,
            }));
            setRows(formattedRows);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (  
        <>
          <div style={{ height: 400, width: '90%',margin:'4vw' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    pagination
                    pageSizeOptions={[10, 15]}
                />
            </div>
        </>
    );
}

export default AdminDoctor;
