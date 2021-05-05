import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import EditPostDialog from './Dialog/EditPostDialog';

import './Post.css';

import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import axios from '../axios.js';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: `5px`,
        margin: `2%`,
        padding: theme.spacing(2),
        minHeight: `20%`,
    }
}));

function Post(props) {
    const classes = useStyles();
    const post = props.post;
    const assigned_to = post.assigned_to.first_name || "None";

    const [open, editOpen] = useState(false);

    const handleEditOpen = () => {
        editOpen(true)
    }

    const handleEditClose = () => {
        editOpen(false)
    }

    const clickDelete = () => {
        axios.delete(`/post/${post._id}`)
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container wrap="nowrap">
                <Grid item style={{paddingRight:10}}>
                    <Avatar>{assigned_to[0]}</Avatar>
                </Grid>
                <Grid item className="body">
                    <Typography variant="subtitle2"> {post.title.substring(0,18)} </Typography>
                    <Typography variant="body2"> {post.description.substring(0,25)} </Typography>
                </Grid>
                <Grid container className="icon" >
                    <IconButton size="small"
                        onClick={handleEditOpen}
                        >
                        <EditIcon style={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size="small"
                        onClick={clickDelete}
                        >
                        <CloseIcon style={{ fontSize: 18 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <EditPostDialog post={post} columns={props.allColumns} members={props.allMembers} open={open} handleClose={handleEditClose} />
        </Paper>

    )
}

export default Post;
