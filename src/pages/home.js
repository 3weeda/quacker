import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Quack from '../components/Quack';
import Navbar from '../components/Navbar';

export default class home extends Component {
    state = {
        quacks: null
    }
    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                console.log(res.data)
                this.setState({ quacks: res.data })
            })
            .catch(err => console.log(err))
    }
    render() {
        let recentQuacks = this.state.quacks ? (
            this.state.quacks.map(quack => <Quack quack={quack} key={quack.screamId} />)
        ) : <p>Loading...</p>
        return (
            <div className="home-container">
                <Navbar />
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {recentQuacks}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <p>profile</p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
