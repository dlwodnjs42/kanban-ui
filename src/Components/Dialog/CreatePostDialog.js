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

function CreatePostDialog(props) {
    const [columnName, setColumnName] = useState("")
    const [reporterName, setReporterName] = useState("")
    const [assignedName, setAssignedName] = useState("")
    const initialValues = {
        title: '',
        description: '',
        story_points: '',
        column:'',
        reporter: '',
        assigned_to: ''
    }
    const [state, setState] = useState(initialValues);
const members = props.members || []

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
            const req = await axios.post(`/post`, state);
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
        setState({...state, 'column': value});
    }
    const handleValueSelectReporterChange = (event) => {
        const value = event.target.value || "";

        setReporterName(value);
        setState({ ...state, 'reporter': value});
    }
    const handleValueSelectAssignedToChange = (event) => {
        const value = event.target.value || "";

        setAssignedName(value);
        setState({ ...state, 'assigned_to': value });
    }


    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Story</DialogTitle>
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
                >
                    {props.columns.map((column) => {
                        return (
                            <MenuItem key={column._id} value={column._id}>
                                {column.column_title}
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
                    onChange={handleValueSelectReporterChange}
                >
                    {members.map((member) => {
                        return (
                            <MenuItem key={member._id} value={member._id}>
                                {member.first_name + " " + member.last_name}
                            </MenuItem>
                        );
                    })}
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
                    onChange={handleValueSelectAssignedToChange}
                >
                    {members.map((member) => {
                        return (
                            <MenuItem key={member._id} value={member._id}>
                                {member.first_name + " " + member.last_name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
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


export default CreatePostDialog;
