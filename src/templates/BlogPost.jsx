import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { Link, injectIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { siteMetadata } from '../../gatsby-config';

// Components
import CommentForm from '../components/CommentForm';
import Comments from '../components/Comments';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

// Utils
import { getFormatedDateForLanguage } from '../utils/gatsby-frontend-helpers';

const useStyles = makeStyles((theme) => ({
    blogTitleText: {
        marginTop: '10px',
        fontSize: '1.5rem;',
    },
    commentForm: {
        margin: '10px 0 20px',
    },
    comments: {
        margin: '10px 0',
    },
}));

const BlogPostTemplate = ({ data, pageContext, location, intl }) => {
    const { markdownRemark } = data;
    const { title, allowComments, categories, date, path: postPath } = markdownRemark.frontmatter;
    const { slug, path, locale } = markdownRemark.fields;
    // const { previous, next } = pageContext;
    const { googleFormData, comments } = pageContext;
    const [previous, next] = [false, false]; // TODO
    const classes = useStyles();

    return (
        <Layout location={location} title={title}>
            <SEO
                lang={intl.locale}
                title={title}
                description={markdownRemark.excerpt}
                keywords={categories}
            />
            <article>
                <header>
                    <Typography
                        className={classes.blogTitleText}
                        color="textPrimary"
                    >
                        {title}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        component="small"
                    >
                        {getFormatedDateForLanguage(date, intl.locale)}
                    </Typography>
                </header>
                <section
                    dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
                />
            </article>
            <nav>
                <ul>
                    {previous && (
                        <li>
                            <Link to={previous.fields.path} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        </li>
                    )}
                    {next && (
                        <li>
                            <Link to={next.fields.path} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <div>
                {allowComments && (
                    <Fragment>
                        <Divider />
                        <CommentForm
                            className={classes.commentForm}
                            googleFormId={siteMetadata.googleFormId}
                            googleFormData={googleFormData}
                            postPath={postPath}
                        />
                        <Divider />
                        <Comments
                            comments={comments}
                            className={classes.comments}
                        />
                    </Fragment>
                )}
            </div>
        </Layout>
    );
};

BlogPostTemplate.propTypes = {
    pageContext: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object.isRequired,
            fields: PropTypes.object.isRequired,
            excerpt: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export default injectIntl(BlogPostTemplate);

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            fields {
                slug
                path
                locale
            }
            frontmatter {
                path
                allowComments
                title
                date
            }
        }
    }
`;
