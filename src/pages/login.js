import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import quacker from '../assets/quacker.svg';
import search from '../assets/search.svg';
import people from '../assets/people.svg';
import chat_bubble from '../assets/chat_bubble.svg';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spreadableStyles
})

class login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.login}>
                <Grid item md xs={12} className={classes.leftSide}>
                    <Grid container className={classes.headlines} justify="center" alignItems="center">
                        <Grid item xs={1} className={classes.icons}>
                            <img src={search} alt="search" className={classes.headlineIcon} />
                            <img src={people} alt="people" className={classes.headlineIcon} />
                            <img src={chat_bubble} alt="chat_bubble" className={classes.headlineIcon} />
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body1" className={classes.headline}>Follow your interests.</Typography>
                            <Typography variant="body1" className={classes.headline}>Hear what people are talking about.</Typography>
                            <Typography variant="body1" className={classes.headline}>Join the conversation.</Typography>
                        </Grid>
                    </Grid>
                    <div style={{ zIndex: '1' }}>
                        <img src={quacker} alt="Quacker Logo" className={classes.watermark} />
                    </div>
                </Grid>
                <Grid item md xs={12} className={classes.rightSide}>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            variant="outlined"
                            onChange={this.handleChange} />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            variant="outlined"
                            onChange={this.handleChange} />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            className={`edged-button ${classes.button}`}
                            disabled={loading}>
                            Log in
                            {loading && <CircularProgress size={30} className={classes.spinner} />}
                        </Button>
                    </form>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    )}
                    <div className={`absolute-center ${classes.signupBlock}`}>
                        <img src={quacker} alt="Quacker Logo" className={classes.image} />
                        <Typography variant="h4" className={classes.signupHeadline}>
                            See what's happening in the world right now
                        </Typography>
                        <Typography variant="body1" className={classes.join}>
                            Join Quacker today.
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={`edged-button ${classes.signupButton}`}>
                            <Link to="/signup">Sign up</Link>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));