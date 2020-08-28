const plugins = require('./gatsby-config.plugins');

const defaultLanguage = 'en';

module.exports = {
    siteMetadata: {
        title: 'My Blog',
        author: 'blopa',
        summary: 'some summary for myself',
        defaultLanguage,
        description: 'Yet another developer personal blog',
        siteUrl: 'https://my.blog',
        social: {
            twitter: 'mytwitteruser',
        },
    },
    plugins,
};
