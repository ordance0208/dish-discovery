import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { useField, useFormikContext } from 'formik';
import { FormHelperText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isEditorEmpty } from '../../utils/editor.helpers';

interface Props {
  name?: string;
  editorValue?: Descendant[];
  error?: boolean;
  touched?: boolean;
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  editorWrapper: {
    overflowY: 'scroll',
    height: 300,
    padding: 16,
    border: '1px solid rgb(188, 188, 188)',
    borderRadius: 4,
    '&:focus-within': {
      outline: `2px solid ${theme.palette.primary.main}`,
      border: 'none',
    },
  },
  error: {
    borderColor: theme.palette.error.main,
    '&:focus-within': {
      outline: `2px solid ${theme.palette.error.main}`,
      border: 'none',
    },
  },
  editable: {
    outline: 'none',
    fontFamily: 'sans-serif',
  },
  helperText: {
    margin: '3px 14px 0 14px',
    color: theme.palette.error.main,
  },
}));

const Editor = ({ name, editorValue, error, touched }: Props) => {
  const classes = useStyles();
  const [, meta] = useField('description');
  const { setFieldValue } = useFormikContext();

  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(editorValue || initialValue);

  useEffect(() => {
    setFieldValue('description', value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <div>
      <div
        className={clsx(classes.editorWrapper, {
          [classes.error]: error && touched && isEditorEmpty(value),
        })}
      >
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
        >
          <Editable
            className={classes.editable}
            placeholder='Recipe description'
          />
        </Slate>
      </div>
      {meta.error && meta.touched && isEditorEmpty(value) && (
        <FormHelperText className={classes.helperText}>
          {meta.error}
        </FormHelperText>
      )}
    </div>
  );
};

export default Editor;
