import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    content: {
        padding: 25,
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        color: "#14171A"
    }
}
class Quack extends Component {
    render() {
        const { classes, quack: { body, createdDate, userHandle, userImage, screamId, likeCount, commentCount } } = this.props;
        dayjs.extend(relativeTime);
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" className={classes.handle} component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        {dayjs(createdDate).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Quack);