import React, { useCallback, useState } from 'react';
import {
    FormControl,
    TextField,
    Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'gatsby-plugin-intl';

const SHORT_ANSWER_TYPE = 0;
const LONG_ANSWER_TYPE = 1;

// https://docs.google.com/forms/d/e/1FAIpQLScoDFq3BzcijipfV7A72EJb6b7bJc1jCC-DaGRDSalW1EZD0A/viewform?embedded=true
function CommentForm({
    googleFormId,
    googleFormData,
    postPath,
}) {
    const intl = useIntl();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { loadData, shuffleSeed } = googleFormData;
    const formBody = loadData[1][1].map((data) => {
        const formName = data[1];
        const formType = data[3];
        const formCode = data[4][0][0];

        if (formType === LONG_ANSWER_TYPE) {
            return (
                <TextField
                    key={formCode}
                    name={`entry.${formCode}`}
                    label={intl.formatMessage({ id: formName })}
                    type={formName}
                    multiline
                    required
                    rows={4}
                    rowsMax={4}
                    inputProps={{ maxLength: 50 }}
                />
            );
        }

        let extraProps = {
            label: intl.formatMessage({ id: formName }),
        };

        if (formName === 'post_path') {
            // post_path is hidden, so no need for translation
            extraProps = {
                value: postPath,
                style: { display: 'none' },
            };
        }

        // if (formType === SHORT_ANSWER_TYPE)
        return (
            <TextField
                key={formCode}
                name={`entry.${formCode}`}
                type={formName}
                required
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...extraProps}
            />
        );
    });

    const onIframeLoad = useCallback(() => {
        // https://stackoverflow.com/a/8558731
        if (isFormSubmitted) {
            window.location = window.location.href;
        }
    }, [isFormSubmitted]);

    const onFormSubmit = useCallback(() => {
        setIsFormSubmitted(true);
    }, [setIsFormSubmitted]);

    return (
        <FormControl>
            <iframe
                title="hidden_iframe"
                name="hidden_iframe"
                id="hidden_iframe"
                style={{ display: 'none' }}
                onLoad={onIframeLoad}
            />
            <form
                action={`https://docs.google.com/forms/d/e/${googleFormId}/formResponse`}
                method="post"
                onSubmit={onFormSubmit}
                target="hidden_iframe"
            >
                {formBody}
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Primary
                </Button>
            </form>
        </FormControl>
    );
}

CommentForm.propTypes = {
    postPath: PropTypes.string.isRequired,
    googleFormId: PropTypes.string.isRequired,
    googleFormData: PropTypes.object.isRequired,
};

export default CommentForm;
