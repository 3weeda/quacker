import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Quack from '../components/scream/Quack';
import Navbar from '../components/layout/Navbar';
import Profile from '../components/profile/Profile';
import { connect } from 'react-redux';
import { getQuacks } from '../redux/actions/dataActions';

class home extends Component {

    componentDidMount() {
        this.props.getQuacks();
    }
    render() {
        const { data: { quacks, loading } } = this.props;
        let recentQuacks = !loading ? (
            quacks.map(quack => <Quack quack={quack} key={quack.screamId} />)
        ) : <p>Loading...</p>
        return (
            <>
                <Navbar />
                <div className="home-container">
                    <Grid container spacing={2}>
                        <Grid item sm={4} xs={12}>
                            <Profile />
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            {recentQuacks}
                        </Grid>
                    </Grid>
                </div>
            </>
        )
    }
}

home.propTypes = {
    getQuacks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})
const mapActionsToProps = {
    getQuacks
}
export default connect(mapStateToProps, mapActionsToProps)(home);
