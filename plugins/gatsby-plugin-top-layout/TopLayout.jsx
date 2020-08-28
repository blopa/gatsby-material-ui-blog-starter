/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomThemeProvider from '../../src/themes/CustomThemeProvider';
import CustomMenuProvider from '../../src/themes/CustomMenuProvider';

export default function TopLayout(props) {
    return (
        <Fragment>
            <Helmet>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <CustomMenuProvider>
                <CustomThemeProvider>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {props.children}
                </CustomThemeProvider>
            </CustomMenuProvider>
        </Fragment>
    );
}

TopLayout.propTypes = {
    children: PropTypes.node,
};
