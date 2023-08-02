import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';

interface Props {
  editorValue?: Descendant[];
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const useStyles = makeStyles({
  editable: {
    outline: 'none',
    fontFamily: 'sans-serif',
  },
});

const Editor = ({ editorValue }: Props) => {
  const classes = useStyles();

  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(editorValue || initialValue);

  return (
    <div>
      <div>
        <Slate
          editor={editor}
          initialValue={value}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
        >
          <Editable
            readOnly
            className={classes.editable}
            placeholder='Recipe description'
          />
        </Slate>
      </div>
    </div>
  );
};

export default Editor;
