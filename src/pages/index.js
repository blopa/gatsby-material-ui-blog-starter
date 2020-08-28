// This file only exists as a entry point for Gatsby
// Since we're writing jsx and using airbnb ESLint rules
// We should not write jsx into a .js file
import { graphql } from 'gatsby';
import React from 'react';
import HomePage from './Home';

const gatsbyEntryPoint = (graphqlResults) => (React.createElement(HomePage, { graphqlResults }));

export default gatsbyEntryPoint;

export const pageQuery = graphql`
    query Index($locale: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            filter: {
                fields: { locale: { eq: $locale } }
                frontmatter: { show: {eq: true} }
            }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                        path
                        locale
                    }
                    frontmatter {
                        date
                        title
                    }
                }
            }
        }
    }
`;

