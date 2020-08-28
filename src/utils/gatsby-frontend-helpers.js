// eslint-disable-next-line import/prefer-default-export
export const getFormatedDateForLanguage = (ISO8601date, language) => {
    const date = new Date(ISO8601date);

    return date.toLocaleDateString(language, { dateStyle: 'long' });
};
