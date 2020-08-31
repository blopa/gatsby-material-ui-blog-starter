const plugins = require('./gatsby-config.plugins');

const defaultLanguage = 'en';

module.exports = {
    pathPrefix: 'gatsby-material-ui-blog-starter',
    siteMetadata: {
        title: 'My Blog',
        author: 'blopa',
        summary: 'some summary for myself',
        defaultLanguage,
        description: 'Yet another developer personal blog',
        siteUrl: 'https://blopa.github.io/gatsby-material-ui-blog-starter/',
        googleFormId: '1FAIpQLScoDFq3BzcijipfV7A72EJb6b7bJc1jCC-DaGRDSalW1EZD0A',
        spreadsheetId: '1uOn0tlxC14bzvcO5YfXbw05oHsqmPuChbQ3dIu9PNno',
        spreadsheetSheetId: 1689070558,
        social: {
            twitter: 'mytwitteruser',
        },
    },
    plugins,
};
