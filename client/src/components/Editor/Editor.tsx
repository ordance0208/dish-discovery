import { useEffect, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { useFormikContext } from 'formik';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props {
  name?: string;
  editorValue?: any;
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
  editable: {
    outline: 'none',
    fontFamily: 'sans-serif',
  },
}));

const Editor = ({ name, editorValue }: Props) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(editorValue || initialValue);

  useEffect(() => {
    setFieldValue(name!, value);
  }, [value]);

  return (
    <div className={classes.editorWrapper}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value: any) => {
          setValue(value);
        }}
      >
        <Editable
          className={classes.editable}
          placeholder='Recipe description'
        />
      </Slate>
    </div>
  );
};

export default Editor;
