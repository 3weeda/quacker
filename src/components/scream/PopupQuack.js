import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import MyButton from '../utils/MyButton';
import { getQuack } from '../redux/actions/dataActions'
import LikeButton from './LikeButton';

const styles = theme => ({
    ...theme.spreradableStyles,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    DialogContent: {
        padding: 20,
        position: 'relative'
    },
    closeModal: {
        position: 'absolute',
        right: '1%'
    },
    expandButton: {
        position: 'absolute',
        right: '5%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class PopupQuack extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getQuack(this.props.quackId);
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes, quack: { screamId, body, createdDate, likeCount, commentCount, userImage, userHandle }, UI: { loading } } = this.props;

        const dialogMarkup = loading ?
            (
                <div className={classes.spinnerDiv}>
                    <CircularProgress size={200} thickness={2} />
                </div>
            )
            : (
                <Grid container spacing={16}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdDate).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <LikeButton quackId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="replies">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} Replies</span>
                    </Grid>
                </Grid>
            )
        return (
            <>
                <MyButton onClick={this.handleOpen} tip="Expand Quack" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeModal}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.DialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

PopupQuack.propTypes = {
    classes: PropTypes.object.isRequired,
    getQuack: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    quack: PropTypes.object.isRequired,
    quackId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({
    quack: state.data.quack,
    UI: state.UI
})

const mapActionsToProps = {
    getQuack
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PopupQuack));