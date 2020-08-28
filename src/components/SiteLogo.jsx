import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    logoText: {
        fontFamily: 'OpenSans Condensed Bold',
    },
});

function SiteLogo() {
    const classes = useStyles();

    return (
        <Typography
            className={classes.logoText}
            color="textPrimary"
            variant="h5"
        >
            My Blog
        </Typography>
    );
}

export default SiteLogo;
