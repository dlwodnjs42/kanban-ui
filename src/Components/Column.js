import React from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import './Column.css';

function Column(props) {

    const columns = {}
    const members = {}

    const initialize = () => {
        props.allMembers.map((member) => {
            const fullname = member.first_name + " " + member.last_name
            members[fullname] = member._id;
        });

        props.allColumns.map((column) => {
            columns[column.column_title] = column._id;
        });
    }

    initialize()

    return (
        <div className="column">
            <Paper elevation={2} className="column-paper-title">
                <Grid container className="column-paper-title-text">
                    <Typography noWrap variant='h6'>
                        {props.column.column_title}
                    </Typography>
                </Grid>
            </Paper>
            <Paper elevation={2} className="column-paper-post">
                {props.column.posts.map((post) => {
                    return (
                        <Grid item>
                            <Post key={post._id} post={post} editOpen={props.editOpen} allMembers={members} allColumns={columns}/>
                        </Grid>
                    )
                })}
            </Paper>
        </div>
    )
}

export default Column;
