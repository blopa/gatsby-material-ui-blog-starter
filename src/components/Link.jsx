/* eslint-disable react/jsx-props-no-spreading, no-shadow */
import React, { forwardRef } from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as GatsbyLink } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';

const Link = (props) => {
    // eslint-disable-next-line react/display-name
    const MyLink = forwardRef(
        (props, ref) => <GatsbyLink innerRef={ref} {...props} />
    );

    return (
        <MuiLink
            {...props}
            component={MyLink}
        >
            {props.children}
        </MuiLink>
    );
};

Link.propTypes = {
    children: PropTypes.node,
};

export default Link;
