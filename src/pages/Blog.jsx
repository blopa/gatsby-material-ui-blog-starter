import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'gatsby-plugin-intl';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Link from '../components/Link';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostsList from '../components/PostsList';

const useStyles = makeStyles((theme) => ({
    blogPostsText: {
        margin: '10px 0',
    },
    postsListWrapper: {
        marginBottom: '10px',
    },
    archiveText: {
        padding: '10px 0',
    },
}));

const Blog = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const intl = useIntl();
    const classes = useStyles();

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                lang={intl.locale}
                title={intl.formatMessage({ id: 'blog' })}
                keywords={[
                    intl.formatMessage({ id: 'seo_keywords.developer' }),
                    intl.formatMessage({ id: 'seo_keywords.development' }),
                    intl.formatMessage({ id: 'seo_keywords.javascript' }),
                    intl.formatMessage({ id: 'seo_keywords.es6' }),
                    intl.formatMessage({ id: 'seo_keywords.gatsby' }),
                ]}
            />
            <Typography
                className={classes.blogPostsText}
                color="textPrimary"
                variant="h4"
            >
                {intl.formatMessage({ id: 'blog_posts' })}
            </Typography>
            <PostsList
                className={classes.postsListWrapper}
                posts={posts}
                locale={intl.locale}
                quantity={10}
            />
            <Link to="/archive">
                <Typography
                    color="textPrimary"
                    variant="overline"
                >
                    {intl.formatMessage({ id: 'archive' })}
                </Typography>
            </Link>
        </Layout>
    );
};

Blog.propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
        }).isRequired,
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                title: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
};

export default Blog;

export const pageQuery = graphql`
    query Blog($locale: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            filter: {
                fields: { locale: { eq: $locale } }
                frontmatter: { show: {eq: true} }
            }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 60)
                    fields {
                        slug
                        path
                        locale
                    }
                    frontmatter {
                        date
                        title
                    }
                }
            }
        }
    }
`;
