import React, {useState, useEffect} from 'react';
import axios from '../axios';


function Dashboard() {

    /* This is where I query for the column_ids with the dashboard_id */

    const [dashboard, setDashboard] = useState([])

    /* */
    useEffect(() => {
        async function fetchData() {
            /* TODO get one dashboard */
            const req = await axios.get('/kanban/dashboard')
            setDashboard(req.data)
        }

        fetchData()
    }, [])



    return (
        <div className='dashboard'>
            {/* Columns */}
        </div>
    )
}

export default Dashboard;
