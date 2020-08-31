import React, { useCallback, useState } from 'react';
import {
    FormControl,
    TextField,
    Button, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useIntl } from 'gatsby-plugin-intl';
import { makeStyles } from '@material-ui/core/styles';

const SHORT_ANSWER_TYPE = 0;
const LONG_ANSWER_TYPE = 1;

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginTop: '20px',
    },
}));

// https://docs.google.com/forms/d/e/1FAIpQLScoDFq3BzcijipfV7A72EJb6b7bJc1jCC-DaGRDSalW1EZD0A/viewform?embedded=true
function CommentForm({
    googleFormId,
    googleFormData,
    postPath,
    className = null,
}) {
    const intl = useIntl();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { loadData, shuffleSeed } = googleFormData;
    const classes = useStyles();

    const formBody = loadData[1][1].map((data) => {
        const formName = data[1];
        const formType = data[3];
        const formCode = data[4][0][0];
        let extraProps = {
            style: { margin: '5px 0' },
            fullWidth: true,
        };

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
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...extraProps}
                />
            );
        }

        if (formName === 'post_path') {
            extraProps = {
                ...extraProps,
                // post_path is hidden, so no need for translation
                label: formName,
                value: postPath,
                style: { display: 'none' },
            };
        } else {
            extraProps = {
                ...extraProps,
                label: intl.formatMessage({ id: formName }),
            };
        }

        if (formName !== 'email') {
            extraProps = {
                ...extraProps,
                required: true,
            };
        }

        // if (formType === SHORT_ANSWER_TYPE)
        return (
            <TextField
                key={formCode}
                name={`entry.${formCode}`}
                type={formName}
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
        <FormControl
            className={className}
        >
            <iframe
                title="hidden_iframe"
                name="hidden_iframe"
                id="hidden_iframe"
                style={{ display: 'none' }}
                onLoad={onIframeLoad}
            />
            <Typography
                color="textSecondary"
                variant="h6"
            >
                {intl.formatMessage({ id: 'post_a_comment' })}
            </Typography>
            <form
                action={`https://docs.google.com/forms/d/e/${googleFormId}/formResponse`}
                method="post"
                onSubmit={onFormSubmit}
                target="hidden_iframe"
            >
                {formBody}
                <Button
                    className={classes.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {intl.formatMessage({ id: 'post_comment' })}
                </Button>
            </form>
        </FormControl>
    );
}

CommentForm.propTypes = {
    postPath: PropTypes.string.isRequired,
    googleFormId: PropTypes.string.isRequired,
    googleFormData: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default CommentForm;
