import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

// Components
import Link from '../components/Link';
import SimplePostsList from '../components/SimplePostsList';

const useStyles = makeStyles((theme) => ({
    simplePostsListWrapper: {
        marginBottom: '10px',
    },
    recentPostsText: {
        margin: '10px 0',
    },
    projectsText: {
        margin: '10px 0',
    },
    seeMoreText: {
        padding: '10px 0',
    },
}));

const HomePage = (props) => {
    const { graphqlResults } = props;
    const { data, location } = graphqlResults;
    const posts = data.allMarkdownRemark.edges;
    // const posts = [];
    const classes = useStyles();
    const intl = useIntl();

    return (
        <Layout location={location}>
            <SEO
                lang={intl.locale}
                title={intl.formatMessage({ id: 'home' })}
                keywords={[
                    intl.formatMessage({ id: 'seo_keywords.developer' }),
                    intl.formatMessage({ id: 'seo_keywords.development' }),
                    intl.formatMessage({ id: 'seo_keywords.javascript' }),
                    intl.formatMessage({ id: 'seo_keywords.es6' }),
                    intl.formatMessage({ id: 'seo_keywords.gatsby' }),
                ]}
            />
            <Typography
                className={classes.recentPostsText}
                color="textPrimary"
                variant="h4"
            >
                {intl.formatMessage({ id: 'recent_posts' })}
            </Typography>
            <SimplePostsList
                className={classes.simplePostsListWrapper}
                posts={posts}
                quantity={5}
                locale={intl.locale}
            />
            <Link to="/blog">
                <Typography
                    color="textPrimary"
                    variant="overline"
                >
                    {intl.formatMessage({ id: 'see_more' })}
                </Typography>
            </Link>
        </Layout>
    );
};

export default HomePage;
