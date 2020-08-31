const path = require('path');
const { read, utils } = require('xlsx');
const { createFilePath } = require('gatsby-source-filesystem');
const {
    siteMetadata: {
        defaultLanguage,
        googleFormId,
        spreadsheetId,
        spreadsheetSheetId,
    },
} = require('./gatsby-config');
const {
    getBlogPostPath,
    convertToKebabCase,
    getGoogleFormData,
    downloadSpreadsheetFile,
} = require('./src/utils/gatsby-node-helpers');

const ignoredPages = ['/Home/'];
let googleFormData = {};
let commentsSpreadsheetData = [];

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    if (!googleFormData.loadData) {
        googleFormData = await getGoogleFormData(
            `https://docs.google.com/forms/d/e/${googleFormId}/viewform?embedded=true`
        );
    }

    if (!commentsSpreadsheetData.length) {
        const result = await downloadSpreadsheetFile(
            spreadsheetId,
            spreadsheetSheetId
        );

        const workbook = read(await result.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        commentsSpreadsheetData = utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });
    }

    const blogPost = path.resolve('./src/templates/BlogPost.jsx');
    const result = await graphql(
        `
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
              fields {
                locale
                path
                slug
              }
              frontmatter {
                title
                show
                path
              }
            }
          }
        }
      }
    `
    );

    if (result.errors) {
        throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;
        const comments = commentsSpreadsheetData.filter((jsonObject) =>
            jsonObject.post_path === post.node.frontmatter.path);

        /*
         * console.log('CREATING POST:', {
         *     post,
         *     slug: post.node.fields.slug,
         *     path: post.node.fields.path,
         * });
         */

        createPage({
            path: post.node.fields.path,
            component: blogPost,
            context: {
                comments: comments.map((comment) => ({
                    email: null,
                    ...comment,
                })),
                googleFormData,
                isBlogPost: true,
                slug: post.node.fields.slug,
                locale: post.node.fields.locale,
                title: post.node.frontmatter.title,
                previous,
                next,
            },
        });
    });
};

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;
    const { locale } = page.context; // from post content
    const { language } = page.context.intl; // from accessed site
    deletePage(page);

    if (
        ignoredPages.includes(page.context.intl.originalPath)
        || (page.context.isBlogPost && locale !== language)
    ) {
        return;
    }

    /*
     * console.log('CREATING PAGE:', {
     *     path: page.path,
     *     locale: language,
     *     isBlogPost: page.context.isBlogPost,
     *     blogLocale: locale,
     * });
     */

    // if (locale === language) {
    createPage({
        ...page,
        path: convertToKebabCase(page.path),
        context: {
            ...page.context,
            intl: {
                ...page.context.intl,
                originalPath: convertToKebabCase(page.context.intl.originalPath),
            },
            locale: language,
            blogLocale: locale,
        },
    });
};

// create the blog posts
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === 'MarkdownRemark') {
        const name = path.basename(node.fileAbsolutePath, '.md');
        // const isDefault = name === 'index';
        const locale = name.split('.')[1] || defaultLanguage;
        const slug = createFilePath({ node, getNode });
        /*
         * const postPath = localizedSlug({ locale, slug: slug.split('.')[0] });
         * const postPath = slug.split('.')[0];
         */
        const { categories = ['general'] } = node.frontmatter;
        const postPath = getBlogPostPath(
            slug,
            categories[0]
        );

        /*
         * console.log(
         *     node.frontmatter.title,
         *     postPath,
         *     categories[0]
         * );
         */

        /*
         * console.log('CREATING NODE:', {
         *     node,
         *     frontmatter: node.frontmatter,
         *     slug,
         *     categories: node.frontmatter.categories,
         * });
         */

        createNodeField({
            name: 'locale',
            node,
            value: locale,
        });

        createNodeField({
            name: 'slug',
            node,
            value: slug,
        });

        createNodeField({
            name: 'path',
            node,
            value: postPath,
        });
    }
};
