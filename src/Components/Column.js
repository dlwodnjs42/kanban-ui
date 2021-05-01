import React from 'react';
import axios from 'axios';

import api from '../api';

import Grid from '@material-ui/core/Grid';



function Column() {
    /* This is where I query for the post data from to column_id */


    const [posts, setPost] = useState([
        {
            "title": "Todo",
            "description": "",
            "story_points": ""
        },
        {
            "title": "In Progress",
            "description": "",
            "story_points": ""
        },
        {
            "title": "Done",
            "description": "",
            "story_points": ""
        }
    ]);




    return (
        <Grid container>
            <Grid container alignItems="center">
                <Grid item>
                    {/* Title */}
                </Grid>
                <Grid item>
                    <Post >

                    </Post>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Column;
