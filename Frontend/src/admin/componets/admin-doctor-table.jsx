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

    
    const [search, setSearch] = useState(''); 
    const [allRows, setAllRows] = useState([]);


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

    useEffect(() => {
        // Filter rows whenever search input changes
        if (search.trim() === '') {
            fetchData(); // If search is empty, fetch all data again
        } else {
            const filteredRows = rows.filter(row =>
                row.name.toLowerCase().includes(search.toLowerCase()) ||
                row.username.toLowerCase().includes(search.toLowerCase())
                // You can include other fields for searching as well
            );
            setRows(filteredRows);
        }
    }, [search]);

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
        <div className='admin-doctor-container'>
                <div className="admin-doctor-scearch-continer">
                    <input type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Scearch Doctor Username'
                        className='scearch-admin-doctor-input'
                    />
                    <button className='scearch-admin-doctor-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
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