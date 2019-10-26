import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import MyButton from '../utils/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteQuack from './DeleteQuack';
import PopupQuack from './PopupQuack';
import LikeButton from './LikeButton';

const styles = {
    card: {
        position: 'relative',
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
        const { classes,
            user: { authenticated,
                credentials: { handle }
            },
            quack: { body, createdDate, userHandle, userImage, likeCount, screamId, commentCount }
        } = this.props;
        dayjs.extend(relativeTime);
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteQuack screamId={screamId} />
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title="Profile image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" className={classes.handle} component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="secondary">
                        {dayjs(createdDate).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton quackId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="replies">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Replies</span>
                    <PopupQuack quackId={screamId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Quack.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    quack: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Quack));