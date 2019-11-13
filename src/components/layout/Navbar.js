import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from '../../utils/MyButton';
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'
import PostQuack from '../scream/PostQuack';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar className="nav-container">
                <Toolbar className="h-center">
                    {authenticated ? (
                        <>
                            <PostQuack />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="primary" />
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications color="primary" />
                            </MyButton>
                        </>
                    ) : (
                            <>

                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </>
                        )
                    }
                </Toolbar>
            </AppBar >
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}


const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
