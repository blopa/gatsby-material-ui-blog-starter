import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useIntl, navigate } from 'gatsby-plugin-intl/index';
import { List, ListItem, ListItemText, Popper, Paper, InputBase } from '@material-ui/core';
import { useFlexSearch } from 'react-use-flexsearch';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Link from './Link';

const useStyles = makeStyles({
    searchWrapper: {
        // marginLeft: 'auto',
        marginRight: '15px',
    },
    searchResultsWrapper: {
        boxShadow: '5px 5px 5px 0px #00000099',
    },
    searchInput: {
        fontSize: '16px',
        background: '#00000019',
        borderRadius: '4px',
        paddingRight: '10px',
        paddingLeft: '10px',
        paddingTop: '4px',
        marginBottom: '4px',
    },
    searchResultsPopper: {
        marginTop: '5px',
        zIndex: 9999, // TODO
        minWidth: '300px',
    },
    searchResultsPaper: {
        maxWidth: '450px',
        marginTop: '12px',
    },
    searchResultsLink: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
});

const Search = ({ className }) => {
    const data = useStaticQuery(graphql`
        query SearchIndexQuery {
            localSearchPages {
                index
                store
            }
        }
    `);
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const intl = useIntl();

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const results = useFlexSearch(
        query,
        data.localSearchPages.index,
        data.localSearchPages.store
    ).filter((page) => page.locale === intl.locale);

    const open = Boolean(anchorEl);
    const selected = selectedItem || results[0];

    return (
        <div
            className={classNames(className, classes.searchWrapper)}
        >
            <InputBase
                className={classes.searchInput}
                onKeyDown={(ev) => {
                    // Enter
                    if (ev.keyCode === 13) {
                        if (selected) {
                            setQuery('');
                            if (anchorEl !== null) {
                                (anchorEl).blur();
                                setAnchorEl(null);
                            }
                            navigate(selected.slug);
                        }
                    } else if (ev.keyCode === 40) {
                        // Down
                        const currIndex = results.findIndex((result) => result.id === selected.id);
                        const newSelected = results[currIndex + 1];
                        if (newSelected) {
                            setSelectedItem(newSelected);
                        }
                    } else if (ev.keyCode === 38) {
                        // Up
                        const currIndex = results.findIndex((result) => result.id === selected.id);
                        const newSelected = results[currIndex - 1];
                        if (newSelected) {
                            setSelectedItem(newSelected);
                        }
                    } else if (ev.keyCode === 27) {
                        // Escape
                        setQuery('');
                    }
                }}
                onChange={(ev) => {
                    setQuery(ev.target.value);
                }}
                onFocus={handleFocus}
                placeholder={intl.formatMessage({ id: 'search_placeholder' })}
                value={query}
            />
            {results.length !== 0
            && (
                <Popper
                    open={open}
                    className={classes.searchResultsPopper}
                    anchorEl={anchorEl}
                    popperOptions={{
                        placement: 'bottom',
                    }}
                >
                    <Paper className={classes.searchResultsPaper}>
                        <List className={classes.searchResultsWrapper}>
                            {results.map((result) => (
                                <ListItem
                                    key={result.id}
                                    selected={selected.id === result.id}
                                >
                                    <Link
                                        to={result.slug}
                                        className={classes.searchResultsLink}
                                        onClick={() => {
                                            setQuery('');
                                            setAnchorEl(null);
                                        }}
                                    >
                                        <ListItemText
                                            // primary={result.slug}
                                            secondary={result.title}
                                        />
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Popper>
            )}
        </div>
    );
};

export default Search;
