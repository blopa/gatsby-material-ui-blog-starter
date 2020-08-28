import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Divider, Container, Typography } from '@material-ui/core';
import { useIntl } from 'gatsby-plugin-intl/index';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Topbar from './Topbar';
import SiteDrawer from './Drawer';
import '../../content/assets/fonts/font-face.css';

const useStyles = makeStyles((theme) => ({
    siteContainer: {
        // backgroundColor: theme.palette.background.paper,
    },
    footerContainer: {
        padding: '20px 0',
    },
}));

const Layout = ({ children, hideTopbar = false }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);
    const classes = useStyles();
    const intl = useIntl();

    return (
        <div>
            <Header siteTitle={data.site.siteMetadata.title} />
            {!hideTopbar && <Topbar />}
            <SiteDrawer />
            <Container className={classes.siteContainer}>
                <Divider />
                <main>{children}</main>
                <Divider />
                <footer className={classes.footerContainer}>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {`${new Date().getFullYear()}, ${intl.formatMessage({ id: 'built_with_gatsby' })}`}
                    </Typography>
                </footer>
            </Container>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    hideTopbar: PropTypes.bool,
};

export default Layout;
