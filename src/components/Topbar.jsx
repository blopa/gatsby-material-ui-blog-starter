import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import ThemeToggler from './ThemeToggler';
import { CustomMenuContext } from '../themes/CustomMenuProvider';
import MenuItems from './MenuItems';
import Link from './Link';
import SiteLogo from './SiteLogo';
import Search from './Search';

const useStyles = makeStyles({
    burguerMenuIcon: {
        marginRight: '15px',
    },
    rightItems: {
        marginLeft: 'auto',
        display: 'inline-flex',
    },
});

function Topbar() {
    const classes = useStyles();
    const { isShowingDrawer, setIsShowingDrawer } = useContext(CustomMenuContext);
    return (
        <div>
            <AppBar
                color="default"
                position="static"
            >
                <Toolbar>
                    <Hidden mdUp>
                        <div className={classes.burguerMenuIcon}>
                            <MenuIcon
                                onClick={() => setIsShowingDrawer(!isShowingDrawer)}
                            />
                        </div>
                    </Hidden>
                    <Link to="/">
                        <SiteLogo />
                    </Link>
                    <Hidden smDown>
                        <MenuItems />
                    </Hidden>
                    <div className={classes.rightItems}>
                        <Hidden xsDown>
                            <Search />
                        </Hidden>
                        <ThemeToggler />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Topbar;
