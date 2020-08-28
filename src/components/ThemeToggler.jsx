import React, { useContext } from 'react';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CustomThemeContext } from '../themes/CustomThemeProvider';

const useStyles = makeStyles({
    togglerWrapper: {
        // marginLeft: 'auto',
    },
});

const ThemeToggler = () => {
    const classes = useStyles();
    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const handleThemeChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            setTheme('dark');
        } else {
            setTheme('normal');
        }
    };

    return (
        <div className={classes.togglerWrapper}>
            {currentTheme === 'dark' ? '🌛' : '🌞'}
            <Switch
                checked={Boolean(currentTheme === 'dark')}
                onChange={handleThemeChange}
            />
        </div>
    );
};

export default ThemeToggler;
