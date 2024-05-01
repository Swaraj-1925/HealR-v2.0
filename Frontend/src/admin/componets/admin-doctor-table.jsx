/* eslint-disable no-unused-vars */

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState} from 'react';
import './../style/admin-doctor.css';


function AdminDoctorTable() {
    const [rows, setRows] = useState([]);
    const [report, setreport] = useState([]);
    const [experience, setExperience] = useState('');
    const [profession, setProfession] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);




    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'report', headerName: 'Report', width: 80, renderCell: (params) => (

                <button onClick={() => handleReportClick(params.row.username)}>{params.row.report}</button>

            )
        },
        { field: 'name', headerName: 'Name', width: 90, wrap: true, autoHeight: true, },
        { field: 'username', headerName: 'Username', width: 170, wrap: true, autoHeight: true, },
        { field: 'age', headerName: 'Age', type: 'number', width: 80 },
        { field: 'gender', headerName: 'Gender', width: 100 },

        {
            field: 'experience', headerName: 'Experience', type: 'number', width: 100, renderCell: (params) => (

                <button onClick={() => handleExperience(params.row.username)}>{params.row.experience}</button>
            )
        },

        {
            field: 'profession', headerName: 'Profession', width: 140, wrap: true, headerAlign: 'center', renderCell: (params) => (
                <button onClick={() => handleProfession(params.row.username)}>{params.row.profession}</button>
            )
        },

        {
            field: 'appointments', headerName: 'Appointments', width: 120, renderCell: (params) => (
                <button onClick={() => handleAppointments(params.row.username)}>{params.row.appointments}</button>
            )
        },

        {
            field: 'reviews', headerName: 'Reviews', width: 100, renderCell: (params) => (
                <button onClick={() => handleReviews(params.row.username)}>{params.row.reviews}</button>
            )
        },

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

    async function handleReportClick(username) {
        console.log(username);
        const Report = await axios.get('http://localhost:3000/admin/Doctor_Report', { params: { username: username } });
        setreport(Report.data)
        setOpen(true);
    }
    async function handleExperience(username) {
        const Report = await axios.get('http://localhost:3000/admin/Doctor_Experience', { params: { username: username } });
        setExperience(Report.data)
        setOpen(true);
    }
    async function handleProfession(username) {
        const Report = await axios.get('http://localhost:3000/admin/Doctor_Profession', { params: { username: username } });
        setProfession(Report.data)
    }
    async function handleAppointments(username) {
        const Report = await axios.get('http://localhost:3000/admin/Doctor_Appointments', { params: { username: username } });
        setAppointments(Report.data)

    }
    async function handleReviews(username) {
        console.log(username);
        const Report = await axios.get('http://localhost:3000/admin/Doctor_Reviews', { params: { username: username } });
        setReviews(Report.data)

    }




    return (
        <>
            <div style={{ height: 400, width: '90%', margin: '4vw' }}>
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

export default AdminDoctorTable;