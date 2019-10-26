import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../utils/MyButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { connect } from 'react-redux';
import { deleteQuack } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        right: '5%',
        top: '10%'
    }
}

class DeleteQuack extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    deleteQuack = () => {
        this.props.deleteQuack(this.props.screamId);
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <MyButton tip="Delete Quack"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Sure you wanna unquack this quack?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteQuack} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>

            </>
        )
    }
}

DeleteQuack.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteQuack: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapActionsToProps = {
    deleteQuack
}

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteQuack))
