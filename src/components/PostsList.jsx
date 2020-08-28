import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getFormatedDateForLanguage } from '../utils/gatsby-frontend-helpers';

// Components
import Link from './Link';

const useStyles = makeStyles((theme) => ({
    blogPostWrapper: {
        padding: '5px 0',
    },
}));

const PostsList = ({
    className,
    posts,
    quantity,
    locale,
}) => {
    let postsLoop = posts;
    if (quantity) {
        postsLoop = posts.slice(0, quantity);
    }
    const classes = useStyles();

    return (
        <div className={className}>
            {postsLoop.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                    <article
                        key={node.fields.slug}
                        className={classes.blogPostWrapper}
                    >
                        <header>
                            <Typography
                                color="textPrimary"
                                variant="h5"
                            >
                                <Link
                                    className={classes.blogPostLink}
                                    color="textPrimary"
                                    to={node.fields.path}
                                    component={Link}
                                >
                                    {title}
                                </Link>
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                component="small"
                            >
                                {getFormatedDateForLanguage(node.frontmatter.date, locale)}
                            </Typography>
                        </header>
                        <section>
                            <em>
                                {node.excerpt}
                            </em>
                        </section>
                    </article>
                );
            })}
        </div>
    );
};

export default PostsList;
