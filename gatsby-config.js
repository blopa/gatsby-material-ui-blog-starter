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
        social: {
            twitter: 'mytwitteruser',
        },
    },
    plugins,
};
