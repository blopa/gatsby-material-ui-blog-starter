import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';
import { getFormatedDateForLanguage } from '../utils/gatsby-frontend-helpers';

const useStyles = makeStyles((theme) => ({
    comment: {
        borderBottom: 'solid 1px #383838',
        padding: '10px',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    commentDate: {
        fontSize: '0.9rem;',
    },
}));

function Comments({ comments, className = null }) {
    const intl = useIntl();
    const classes = useStyles();

    let commentsBody;
    if (!comments.length) {
        commentsBody = (
            <Typography
                color="textSecondary"
                variant="body2"
                component="p"
            >
                {intl.formatMessage({ id: 'no_comments' })}
            </Typography>
        );
    } else {
        commentsBody = comments.map((comment) => (
            <div
                key={comment.post_path}
                className={classes.comment}
            >
                <Typography
                    color="textSecondary"
                    variant="body1"
                    component="p"
                >
                    {comment.name}
                    {' '}
                    <em className={classes.commentDate}>
                        {intl.formatMessage({ id: 'on' })}
                        {' '}
                        {getFormatedDateForLanguage(Date.parse(comment.date), intl.locale, 'short')}
                    </em>
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                    component="em"
                >
                    {comment.comment}
                </Typography>
            </div>
        ));
    }

    return (
        <div
            className={className}
        >
            <Typography
                color="textSecondary"
                variant="h6"
            >
                {intl.formatMessage({ id: 'comments' })}
            </Typography>
            {commentsBody}
        </div>
    );
}

Comments.propTypes = {
    className: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.shape({
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        post_path: PropTypes.string,
    })),
};

export default Comments;
