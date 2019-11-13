import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../../utils/MyButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { likeQuack, unlikeQuack } from '../../redux/actions/dataActions';

class likeButton extends Component {

    likedQuack = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.quackId)) {
            return true;
        } else return false;
    }

    likeQuack = () => {
        this.props.likeQuack(this.props.quackId);
    }

    unlikeQuack = () => {
        this.props.unlikeQuack(this.props.quackId);
    }

    render() {
        const { user: { authenticated } } = this.props;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : (
                this.likedQuack() ?
                    <MyButton tip="Unlike" onClick={this.unlikeQuack}><FavoriteIcon color="primary" /></MyButton>
                    :
                    <MyButton tip="Like" onClick={this.likeQuack}><FavoriteBorder color="primary" /></MyButton>
            )

        return likeButton;
    }
}

likeButton.propTypes = {
    likeQuack: PropTypes.func.isRequired,
    unlikeQuack: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    quackId: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeQuack,
    unlikeQuack
}

export default connect(mapStateToProps, mapActionsToProps)(likeButton);
