import React, { useState } from 'react';
import axios from '../../axios.js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function EditPostDialog(props) {
    const post = props.post;

    const defaultAssigned = (post.assigned_to.first_name && post.assigned_to.last_name ? (post.assigned_to.first_name + " " + post.assigned_to.last_name) : "");
    const defaultColumn = post.column ? post.column.column_title : "";
    const defaultReporter = (post.reporter.first_name && post.reporter.last_name? (post.reporter.first_name + " " + post.reporter.last_name) : "");


    const [columnName, setColumnName] = useState(defaultColumn);
    const [reporterName, setReporterName] = useState(defaultReporter);
    const [assignedName, setAssignedName] = useState(defaultAssigned);

    const initialValues = {
        title: post.title,
        description: post.description,
        story_points: post.story_points,
        column: post.column._id,
        reporter: post.reporter._id,
        assigned_to: post.assigned_to._id
    }
    const [state, setState] = useState(initialValues);
    const members = props.members || [];
    const columns = props.columns || [];

    const handleClose = () => {
        setState(initialValues)
    }

    const checkRequired = (state) => {
        if (state.title && state.description && state.story_points && state.column) {
            return true;
        }
        return false;
    }

    const handleCloseAndSave = () => {
        if (!checkRequired(state)) {
            return
        }
        async function createPost() {
            /* TODO get one dashboard */
            const req = await axios.patch(`/post/${post._id}`, state);
            /* TODO another dialog saying it succeeded! */
        }
        createPost();
        props.handleClose()


    }

    const handleValueTextChange = (event) => {
        const { name, value } = event.target
        setState(({
            ...state,
            [name]: value
        }))
    }

    const handleValueSelectTitleChange = (event) => {
        const value = event.target.value || "";

        setColumnName(value);
        setState({ ...state, 'column': columns[value] });
    }
    const handleValueSelectReporterChange = (event) => {
        const value = event.target.value || "";

        setReporterName(value);
        setState({ ...state, 'reporter': members[value] });
    }
    const handleValueSelectAssignedToChange = (event) => {
        const value = event.target.value || "";

        setAssignedName(value);
        setState({ ...state, 'assigned_to': members[value] });
    }


    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Story</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Title"
                    name="title"
                    type="title"
                    fullWidth
                    defaultValue={state.title}
                    onChange={handleValueTextChange}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    label="description"
                    name="description"
                    type="description"
                    fullWidth
                    defaultValue={state.description}
                    onChange={handleValueTextChange}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="story_points"
                    label="story_points"
                    name="story_points"
                    type="story_points"
                    fullWidth
                    defaultValue={state.story_points}
                    onChange={handleValueTextChange}
                />
            </DialogContent>
            <FormControl style={{ "padding": "20px 24px" }}>
                <InputLabel id="dashboard-column-input-label" style={{ "padding": "8px 24px" }}>
                    Column
                    </InputLabel>
                <Select
                    labelId="dashboard-column-input"
                    id="dashboard-column-input"
                    name="column"
                    value={columnName}
                    onChange={handleValueSelectTitleChange}
                    defaultValue={defaultColumn}
                >
                    {Object.keys(columns).map((key) => {
                        return (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <FormControl style={{ "padding": "20px 24px" }}>
                <InputLabel id="dashboard-assigned-input-label" style={{ "padding": "8px 24px" }}>
                    Reporter
                </InputLabel>
                <Select
                    labelId="dashboard-assigned-input"
                    id="dashboard-assigned-input"
                    value={reporterName}
                    defaultValue={defaultReporter}
                    onChange={handleValueSelectReporterChange}
                >
                    {Object.keys(members).map((key) => {
                        return (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        );
                    })
                    }
                </Select>
            </FormControl>
            <FormControl style={{ "padding": "20px 24px" }}>
                <InputLabel id="dashboard-assigned-input-label" style={{ "padding": "8px 24px" }}>
                    Assigned To
                    </InputLabel>
                <Select
                    labelId="dashboard-assigned-input"
                    id="dashboard-assigned-input"
                    value={assignedName}
                    defaultValue={defaultAssigned}
                    onChange={handleValueSelectAssignedToChange}
                >
                    {Object.keys(members).map((key) => {
                        return (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <DialogContentText style={{ textAlign: 'center' }}>
                Created At: {post.created_at}
            </DialogContentText>
            <DialogContentText style={{textAlign:'center'}}>
                Updated At: {post.updated_at}
            </DialogContentText>

            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                    </Button>
                <Button onClick={handleCloseAndSave} color="primary">
                    Confirm
                    </Button>
            </DialogActions>

        </Dialog>
    )
}

export default EditPostDialog;
