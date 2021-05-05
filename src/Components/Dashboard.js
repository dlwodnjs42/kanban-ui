import React, {useState, useEffect} from 'react';
import axios from '../axios.js';

import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Column from './Column.js';
import CreatePostDialog from './Dialog/CreatePostDialog.js'
import './Dashboard.css'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';


function Dashboard() {

    /* This is where I query for the column_ids with the dashboard_id */
    const [dashboard, setDashboard] = useState([]);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    // const classes = useStyles();

    /* This will preload the dashboard. */
    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(`/dashboard/608dcf4e146eb45156891b40`);
            setDashboard(req.data[0]);
        }
        fetchData();
    }, [setOpen])

    // Set default
    const columns = dashboard["columns"] || []
    const members = dashboard["users"] || []

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleEditClose = () => {
        setEditOpen(false);
    }
    const handleEditOpen = () => {
        setEditOpen(true);
    }

    const createSettingsButton = () => {
        return (
            <div className="dashboard-create-settings-button">
                <IconButton aria-label="settings" size="small" >
                    <SettingsIcon fontSize="inherit" />
                </IconButton>
            </div>
        )
    }

    const createPostButton = () => {
        return (
            <div className="dashboard-create-post-button">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Create Post
                </Button>
                <CreatePostDialog columns={columns} members={members} open={open} handleClose={handleClose} />
            </div>
        )
    }

    const getColumnSize = (column_count) => {
        if (column_count !== 0) {
            return 12 / column_count;
        } else {
            return 12;
        }
    }


    return (
        <div className="dashboard">
            <div className="dashboard-title">
                <div className="dashboard-title-text">
                    <Grid container>
                        <Grid item container alignItems="center" justify="center" xs={12}>
                            <Typography variant="h5">
                                {dashboard.project_title}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <div className="dashboard-update-buttons">
                    {createSettingsButton()}
                    {createPostButton(columns, members, open)}
                </div>
            </div>
            <div className="dashboard-columns">
                <Paper elevation={3} className="dashboard-columns-paper">
                    <Grid container direction="row">
                        {
                            columns.map((column) => {
                                return (
                                    <Grid item xs={getColumnSize(columns.length)}>
                                        <Column key={columns._id} column={column} editOpen={handleEditOpen} allMembers={members} allColumns={columns}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Paper>
            </div>
        </div>
    )
}

export default Dashboard;
