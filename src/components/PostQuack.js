import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import MyButton from '../utils/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postQuack, clearErrors } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadableStyles,
    submitQuackButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    closeModal: {
        position: 'absolute',
        right: '1%',
        top: '5%'
    }
})

export class PostQuack extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    static getDerivedStateFromProps(props, state) {
        if (props.UI.errors && props.UI.errors !== state.errors) {
            return {
                errors: props.UI.errors
            };
        }
        else return null;
    }

    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, body: '', errors: {} })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.postQuack({ body: this.state.body })
        if (!this.props.UI.loading && this.state.body.trim() !== '') this.handleClose();
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <div>
                <MyButton tip="Post a Quack!" onClick={this.handleOpen}>
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeModal}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post a new quack</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Quack"
                                multiline
                                rows="3"
                                placeholder="Quack quack quack"
                                error={errors.error ? true : false}
                                helperText={errors.error}
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitQuackButton}
                                disabled={loading}>
                                Post
                                {loading && <CircularProgress size={30} className={classes.spinner} />}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

PostQuack.propTypes = {
    postQuack: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postQuack, clearErrors })(withStyles(styles)(PostQuack))
