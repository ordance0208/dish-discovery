import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { useField, useFormikContext } from 'formik';
import { FormHelperText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Chip from '../Chip';

interface Props {
  name?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  recipeTagsWrapper: {
    border: '1px solid rgb(188, 188, 188)',
    borderRadius: 4,
    padding: 8,
    height: 48,
    '&:hover': {
      border: '1px solid rgb(118, 118, 118)',
    },
    '&:focus-within': {
      outline: `2px solid ${theme.palette.primary.main}`,
      border: 'none',
    },
  },
  paddingFix: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingRight: 14,
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  input: {
    outline: 'none',
    border: 'none',
    background: 'transparent',
    fontSize: 15.5,
    flex: 1,
  },
  helperText: {
    margin: '3px 14px 0 14px',
    color: theme.palette.error.main,
  },
  error: {
    borderColor: theme.palette.error.main,
    '&:focus-within': {
      outline: `2px solid ${theme.palette.error.main}`,
      border: 'none',
    },
  },
}));

const RecipeTags = ({ name }: Props) => {
  const classes = useStyles();
  const [field, meta] = useField(name!);
  const { setFieldValue } = useFormikContext();

  const [tags, setTags] = useState<string[]>(field.value || []);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setFieldValue(name!, tags);
    // eslint-disable-next-line
  }, [tags]);

  useEffect(() => {
    if (!field.value) return;
    setTags(field.value);
  }, [field.value]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',') {
      const formattedWord = inputValue.trim();

      const isDuplicate = tags.includes(formattedWord);
      if (formattedWord === '' || isDuplicate) return;

      const newTags = [...tags, formattedWord];

      setTags(newTags);
      setInputValue('');
    }
  };

  const handleDeleteTag = (newTag: string) => {
    const updatedTags = tags.filter((tag: string) => tag !== newTag);
    setTags(updatedTags);
    inputRef?.current?.focus();
  };

  return (
    <>
      <div
        className={clsx(classes.recipeTagsWrapper, {
          [classes.error]: !!meta.error && meta.touched,
        })}
        onClick={() => inputRef?.current?.focus()}
      >
        <div className={classes.paddingFix}>
          {tags.map((tag: string) => (
            <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
          ))}
          <input
            ref={inputRef}
            className={classes.input}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === ',') return;
              setInputValue(e.target.value);
            }}
            placeholder={
              isEmpty(tags)
                ? 'Enter at least one tag (separate the tags with a comma)'
                : undefined
            }
            onKeyDown={handleAddTag}
          />
        </div>
      </div>
      {!!meta.error && meta.touched && (
        <FormHelperText className={classes.helperText}>
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default RecipeTags;
