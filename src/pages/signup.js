import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import quacker from '../assets/quacker.svg';

const styles = (theme) => ({
    ...theme.spreadableStyles
})

class signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        loading: false,
        errors: {}
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ errors: err.response.data, loading: false })
            })
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.signupForm} justify="center">
                <Grid item xs={10} sm={6} md={4}>
                    <img src={quacker} alt="quacker" className={classes.image} />
                    <Typography variant="h1" className={classes.pageTitle}>
                        Sign up to Quacker
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={`${classes.textField} ${classes.signupTextField}`}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={`${classes.textField} ${classes.signupTextField}`}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={`${classes.textField} ${classes.signupTextField}`}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            className={`${classes.textField} ${classes.signupTextField}`}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            variant="outlined"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={`edged-button ${classes.wideSignupButton}`}
                            disabled={loading}
                        >
                            Sign up
                        {loading && (
                                <CircularProgress size={30} className={classes.spinner} />
                            )}
                        </Button>
                        <br />
                        <small className={classes.small} style={{ color: '#d78018' }}>
                            <Link to="/login">Already have an account ? Log in</Link>
                        </small>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(signup);