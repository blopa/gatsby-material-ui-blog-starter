import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Hidden } from '@material-ui/core';
import { CustomMenuContext } from '../themes/CustomMenuProvider';
import MenuItems from './MenuItems';
import Link from './Link';
import SiteLogo from './SiteLogo';
import Search from './Search';

const useStyles = makeStyles({
    menuItemsList: {
        width: 250,
    },
    homeMenuLink: {
        margin: '10px',
    },
    searchWrapper: {
        margin: '0 auto',
    },
});

function SiteDrawer() {
    const { isShowingDrawer, setIsShowingDrawer } = useContext(CustomMenuContext);
    const classes = useStyles();
    const closeDrawer = useCallback(() => setIsShowingDrawer(false), []);

    return (
        <div>
            <React.Fragment key="left">
                <Drawer
                    anchor="left"
                    open={isShowingDrawer}
                    onClose={closeDrawer}
                >
                    <div
                        className={classes.homeMenuLink}
                    >
                        <Link
                            to="/"
                            onClick={closeDrawer}
                        >
                            <SiteLogo />
                        </Link>
                    </div>
                    <div
                        className={classes.menuItemsList}
                        role="presentation"
                    >
                        <MenuItems
                            isDrawer
                            onItemClick={closeDrawer}
                        />
                    </div>
                    <Hidden smUp>
                        <Search
                            className={classes.searchWrapper}
                        />
                    </Hidden>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SiteDrawer;
