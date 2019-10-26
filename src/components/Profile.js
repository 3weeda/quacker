import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import EditDetails from './EditDetails';
import MyButton from '../utils/MyButton';

const styles = theme => ({
    ...theme.spreadableStyles
})

class Profile extends Component {

    handleImageChange = e => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditImage = () => {
        // pass click event form input to icon
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/login')
    }

    render() {
        const { classes, user: { credentials: { handle, createdDate, imageUrl, bio, website, location }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <MyButton
                            tip="Edit profile picture"
                            onClick={this.handleEditImage}>
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr />
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr />
                            </>
                        )}
                        <CalendarToday color="primary" />{' '}
                        <span>Joined {dayjs(createdDate).format('MM YYYY')} </span>
                    </div>
                    <MyButton
                        tip="Logout"
                        onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                    </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                    </div>
                </Paper>
            )
        ) : (<p>Loading...</p>)

        return profileMarkup;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    logoutUser,
    uploadImage
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile)));
