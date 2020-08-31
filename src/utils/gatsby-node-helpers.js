const nodeFetch = require('node-fetch');

// Use a little helper function to remove trailing slashes from paths
exports.removeTrailingSlash = (path) =>
    (path === '/' ? path : path.replace(/\/$/, ''));

exports.localizedSlug = ({ locale, slug }) =>
    (`/${locale}${slug}`);

/*
 * From lodash:
 * https://github.com/lodash/lodash/blob/750067f42d3aa5f927604ece2c6df0ff2b2e9d72/findKey.js
 */
exports.findKey = (object, predicate) => {
    let result;
    if (object == null) {
        return result;
    }
    Object.keys(object).some((key) => {
        const value = object[key];
        if (predicate(value, key, object)) {
            result = key;
            return true;
        }
        return false;
    });

    return result;
};

exports.convertToKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

exports.getBlogPostPath = (slug, category) => {
    /*
     * remove language extension
     * example: "/2015/2015-05-28-new-beginnings.pt-br/"
     * result: "/2015/2015-05-28-new-beginnings"
     */
    const path = slug.split('.')[0];
    /*
     * split into parts
     * example: "/2015/2015-05-28-new-beginnings"
     * result: ["", "2015", "2015-05-28-new-beginnings"]
     */
    const pathParts = path.split('/');
    /*
     * remove date from path
     * example: "2015-05-28-new-beginnings"
     * result: "new-beginnings"
     */
    const pathWithoutDate = pathParts[2].slice(11, pathParts[2].length);
    // const year = pathParts[1];

    return `/blog/${category}/${pathWithoutDate}/`;
};

exports.getGoogleFormData = async (url) => nodeFetch(url, {
    method: 'GET',
})
    .then((response) => {
        if (!response.ok) {
            throw Error('Network request failed');
        }

        return response.text()
            .then((data) => {
                let loadData = data.split('FB_PUBLIC_LOAD_DATA_');
                loadData = loadData[1].split(';');
                // eslint-disable-next-line no-new-func
                const getLoadData = new Function(`const result${loadData[0]}; return result`);
                // let shuffleSeed = data.split('data-shuffle-seed="');
                // shuffleSeed = shuffleSeed[1].split('"');
                return {
                    loadData: getLoadData(),
                    // shuffleSeed: shuffleSeed[0],
                };
            });
    });

exports.downloadSpreadsheetFile = async (spreadsheetId, sheetId = 0, forceCors = false) => {
    let url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=xlsx&gid=${sheetId}`;
    if (forceCors) {
        url = `https://cors-anywhere.herokuapp.com/${url}`;
    }

    const response = await nodeFetch(url);
    // eslint-disable-next-line no-return-await
    return await response.blob();
};
