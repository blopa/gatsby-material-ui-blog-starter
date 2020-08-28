const defaultLanguage = 'en';
const contentPath =
    process.env.NODE_ENV === 'development' ? `${__dirname}/local_content` : `${__dirname}/content`;

module.exports = [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-eslint',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    /*
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    'gatsby-plugin-offline',
    /*
     * If you want to use styled components you should add the plugin here.
     * 'gatsby-plugin-styled-components',
     */
    'gatsby-plugin-react-helmet',
    {
        resolve: 'gatsby-plugin-local-search',
        options: {
            // A unique name for the search index. This should be descriptive of
            // what the index contains. This is required.
            name: 'pages',

            // Set the search engine to create the index. This is required.
            // The following engines are supported: flexsearch, lunr
            engine: 'flexsearch',

            // Provide options to the engine. This is optional and only recommended
            // for advanced users.
            //
            // Note: Only the flexsearch engine supports options.
            engineOptions: 'speed',

            // GraphQL query used to fetch all data for the search index. This is
            // required.
            query: `
          {
            allMarkdownRemark(
              filter: {
                frontmatter:{ show: {eq: true} }
              }
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    locale
                    path
                    slug
                  }
                  frontmatter {
                    title
                    show
                    excerpt
                  }
                }
              }
            }
          }
        `,

            // Field used as the reference value for each document.
            // Default: 'id'.
            ref: 'id',

            // List of keys to index. The values of the keys are taken from the
            // normalizer function below.
            // Default: all fields
            index: ['title', 'slug', 'excerpt'],

            // List of keys to store and make available in your UI. The values of
            // the keys are taken from the normalizer function below.
            // Default: all fields
            store: ['id', 'slug', 'title', 'locale'],

            // Function used to map the result from the GraphQL query. This should
            // return an array of items to index in the form of flat objects
            // containing properties to index. The objects must contain the `ref`
            // field above (default: 'id'). This is required.
            normalizer: ({ data }) => data.allMarkdownRemark.edges.map(({ node }) => ({
                id: node.id,
                slug: node.fields.path,
                locale: node.fields.locale,
                title: node.frontmatter.title,
                excerpt: node.frontmatter.excerpt,
            })),
        },
    },
    {
        resolve: 'gatsby-transformer-remark',
        options: {
            plugins: [
                {
                    resolve: 'gatsby-remark-images',
                    options: {
                        maxWidth: 590,
                    },
                },
                {
                    resolve: 'gatsby-remark-responsive-iframe',
                    options: {
                        wrapperStyle: 'margin-bottom: 1.0725rem',
                    },
                },
                'gatsby-remark-prismjs',
                'gatsby-remark-copy-linked-files',
                'gatsby-remark-smartypants',
            ],
        },
    },
    {
        resolve: 'gatsby-plugin-intl',
        options: {
            path: `${__dirname}/src/intl`,
            languages: ['en', 'pt-br'],
            defaultLanguage,
            redirect: true,
            redirectComponent: require.resolve('./src/utils/redirect.js'),
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${contentPath}/posts`,
            name: 'posts',
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/content/assets`,
            name: 'assets',
        },
    },
    {
        resolve: 'gatsby-source-filesystem',
        options: {
            path: `${__dirname}/content/uploads`,
            name: 'uploads',
        },
    },
    {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
            // trackingId: `ADD YOUR TRACKING ID HERE`,
        },
    },
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
            name: 'Gatsby Starter Blog',
            short_name: 'GatsbyJS',
            start_url: '/',
            background_color: '#ffffff',
            theme_color: '#663399',
            display: 'minimal-ui',
            icon: 'content/assets/favicon.png',
        },
    },
    {
        resolve: 'gatsby-plugin-material-ui',
        /*
         * If you want to use styled components, in conjunction to Material-UI, you should:
         * - Change the injection order
         * - Add the plugin
         */
        options: {
            /*
             * stylesProvider: {
             *   injectFirst: true,
             * },
             */
        },
        // 'gatsby-plugin-styled-components',
    },
];
