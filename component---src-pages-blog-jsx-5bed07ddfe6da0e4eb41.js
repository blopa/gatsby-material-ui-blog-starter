(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{CoOT:function(e,a,t){"use strict";t.d(a,"a",(function(){return r}));var r=(e,a)=>new Date(e).toLocaleDateString(a,{dateStyle:"long"})},L8hy:function(e,a,t){"use strict";t.r(a),t.d(a,"pageQuery",(function(){return f}));var r=t("q1tI"),o=t.n(r),s=t("kCIJ"),l=t("R/WZ"),n=t("ofer"),c=t("vCQb"),i=t("L6Je"),m=t("hYuR"),d=t("CoOT"),p=Object(l.a)(e=>({blogPostWrapper:{padding:"5px 0"}})),g=e=>{var{className:a,posts:t,quantity:r,locale:s}=e,l=t;r&&(l=t.slice(0,r));var i=p();return o.a.createElement("div",{className:a},l.map(e=>{var{node:a}=e,t=a.frontmatter.title||a.fields.slug;return o.a.createElement("article",{key:a.fields.slug,className:i.blogPostWrapper},o.a.createElement("header",null,o.a.createElement(n.a,{color:"textPrimary",variant:"h5"},o.a.createElement(c.a,{className:i.blogPostLink,color:"textPrimary",to:a.fields.path,component:c.a},t)),o.a.createElement(n.a,{color:"textSecondary",variant:"body2",component:"small"},Object(d.a)(a.frontmatter.date,s))),o.a.createElement("section",null,o.a.createElement("em",null,a.excerpt)))}))},u=Object(l.a)(e=>({blogPostsText:{margin:"10px 0"},postsListWrapper:{marginBottom:"10px"},archiveText:{padding:"10px 0"}})),f=(a.default=e=>{var{data:a,location:t}=e,r=a.site.siteMetadata.title,l=a.allMarkdownRemark.edges,d=Object(s.useIntl)(),p=u();return o.a.createElement(i.a,{location:t,title:r},o.a.createElement(m.a,{lang:d.locale,title:d.formatMessage({id:"blog"}),keywords:[d.formatMessage({id:"seo_keywords.developer"}),d.formatMessage({id:"seo_keywords.development"}),d.formatMessage({id:"seo_keywords.javascript"}),d.formatMessage({id:"seo_keywords.es6"}),d.formatMessage({id:"seo_keywords.gatsby"})]}),o.a.createElement(n.a,{className:p.blogPostsText,color:"textPrimary",variant:"h4"},d.formatMessage({id:"blog_posts"})),o.a.createElement(g,{className:p.postsListWrapper,posts:l,locale:d.locale,quantity:10}),o.a.createElement(c.a,{to:"/archive"},o.a.createElement(n.a,{color:"textPrimary",variant:"overline"},d.formatMessage({id:"archive"}))))},"4013818670")}}]);
//# sourceMappingURL=component---src-pages-blog-jsx-5bed07ddfe6da0e4eb41.js.map