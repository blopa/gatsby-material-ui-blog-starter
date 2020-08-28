import React from 'react';
import { graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const useStyles = makeStyles((theme) => ({
    notFoundWrapper: {
        margin: '10px 0',
    },
}));

const NotFoundPage = ({ data, location, intl }) => {
    const siteTitle = data.site.siteMetadata.title;
    const classes = useStyles();

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                lang={intl.locale}
                title={intl.formatMessage({ id: 'notfound.title' })}
            />
            <div className={classes.notFoundWrapper}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {intl.formatMessage({ id: 'notfound.header' })}
                </Typography>
                <Typography
                    color="textPrimary"
                >
                    {intl.formatMessage({ id: 'notfound.description' })}
                </Typography>
            </div>
        </Layout>
    );
};

export default injectIntl(NotFoundPage);

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
