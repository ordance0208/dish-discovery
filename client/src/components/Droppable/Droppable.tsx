import React, { ChangeEvent, DragEvent, useState, useRef } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { UilTimes } from '@iconscout/react-unicons';
import Typography from '../Typography';
import IconButton from '../IconButton';

interface Props {
  text?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  droppable: {
    borderRadius: 4,
    border: '2px dashed lightgray',
    width: 500,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  fileName: {
    display: 'flex',
    gap: 16,
  },
  text: {
    fontSize: 18,
  },
  input: {
    display: 'none',
  },
}));

const Droppable = ({ text }: Props) => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef?.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
  };

  const handleImageUpload = (file: File) => {
    setFile(file);
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e?.dataTransfer?.files?.length === 1) {
      const file = e?.dataTransfer?.files[0];
      const isImage = file?.type?.split('/')[0] === 'image';

      if (!isImage) return;
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
  };

  return (
    <>
      <div
        className={classes.droppable}
        onClick={handleUploadClick}
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        <div className={classes.fileName}>
          <Typography className={classes.text}>
            {file?.name || text || 'Drag and drop or click to upload an image'}
          </Typography>
          {!!file && (
            <IconButton onClick={handleRemoveFile}>
              <UilTimes size={18} />
            </IconButton>
          )}
        </div>
        <input
          ref={inputRef}
          className={classes.input}
          type='file'
          accept='image/*'
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default Droppable;
