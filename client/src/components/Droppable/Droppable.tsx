import React, {
  ChangeEvent,
  DragEvent,
  useState,
  useRef,
  useMemo,
} from 'react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { UilTimes } from '@iconscout/react-unicons';
import Typography from '../Typography';
import IconButton from '../IconButton';

interface Props {
  text?: string;
  fileError?: boolean;
  customError?: string;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
  image?: string | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  droppableWrapper: {
    display: 'flex',
    gap: 32,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  droppable: {
    borderRadius: 4,
    border: '2px dashed rgb(188, 188, 188)',
    width: 500,
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  fileName: {
    display: 'flex',
    gap: 16,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
  },
  uploadedImage: {
    height: 150,
    width: 150,
    objectFit: 'cover',
    alignSelf: 'flex-end',
    [theme.breakpoints.down('md')]: {
      alignSelf: 'flex-start',
    },
  },
  input: {
    display: 'none',
  },
  error: {
    border: `2px dashed ${theme.palette.error.main}`,
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

const Droppable = ({
  text,
  fileError,
  customError,
  image,
  setFile: setFileHoist,
}: Props) => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFieldValue } = useFormikContext();

  const handleUploadClick = () => {
    if (file) return;
    inputRef?.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleImageUpload(file);
  };

  const handleImageUpload = (file: File | null) => {
    setFile(file);
    setFileHoist?.(file!);
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
    handleImageUpload(null);
    setFieldValue('image', undefined);
    inputRef!.current!.value = '';
  };

  const getImageUrl = () => {
    if (!file) return undefined;
    const url = URL.createObjectURL(file);
    return url;
  };

  return useMemo(
    () => (
      <>
        <div className={classes.droppableWrapper}>
          <div
            className={clsx(classes.droppable, { [classes.error]: fileError })}
            onClick={handleUploadClick}
            onDrop={handleOnDrop}
            onDragOver={handleDragOver}
          >
            <div className={classes.fileName}>
              <Typography
                className={clsx(classes.text, {
                  [classes.errorText]: fileError,
                })}
              >
                {(fileError && (customError || 'Upload file')) ||
                  (image && image.split('\\').pop()) ||
                  file?.name ||
                  text ||
                  'Drag and drop or click to upload an image'}
              </Typography>
              {(!!file || image) && (
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
          {(!!file || image) && (
            <img
              className={classes.uploadedImage}
              src={file ? getImageUrl() : image}
              alt='submitted'
            />
          )}
        </div>
      </>
    ),
    // eslint-disable-next-line
    [image, file]
  );
};

export default Droppable;
