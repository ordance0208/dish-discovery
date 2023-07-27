import { useState } from 'react';
import {
  FieldArray,
  FieldArrayRenderProps,
  Formik,
  FormikProps,
  Field,
} from 'formik';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isEditorEmpty } from '../../utils/editor.helpers';
import useSubmitRecipe from '../../hooks/recipe/useSubmitRecipe';
import { UilPlus, UilTimes } from '@iconscout/react-unicons';
import Typography from '../../components/Typography';
import TextField from '../../components/TextField';
import Droppable from '../../components/Droppable';
import RecipeTags from '../../components/RecipeTags';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import IconButton from '../../components/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1440,
    margin: '0 auto',
  },
  submitRecipeHeading: {
    fontSize: 32,
    fontWeight: 700,
    margin: '32px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 700,
    marginBottom: 32,
  },
  chip: {
    width: 100,
  },
  ingredientsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  singleIngredient: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  ingredientsButtons: {
    margin: '9px 0',
    maxHeight: 50,
    alignSelf: 'flex-start',
  },
  recipeIngredientsText: {
    marginBottom: 8,
  },
  submitButton: {
    width: 150,
  },
}));

const RecipeSubmit = () => {
  const classes = useStyles();

  const [file, setFile] = useState<File | null>(null);
  const { initialValues, validationSchema, onSubmit } = useSubmitRecipe();

  const handleFormSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.submitRecipeHeading}>
        Submit a recipe
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {(props: FormikProps<any>) => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <TextField name='title' label='Title' />
              <Field
                component={Droppable}
                name='file'
                customError={'Submit a recipe image'}
                fileError={props.submitCount > 0 && !file}
                setFile={setFile}
                text='Drag and drop or click to upload a recipe image'
                validate={() => {
                  if (!file) {
                    return 'Submit a recipe image';
                  }
                }}
              />
              <Field
                component={Editor}
                name='description'
                error={isEditorEmpty(props.values.description)}
                touched={props.submitCount > 0}
                editorValue={props.values.description}
                validate={(value: any) => {
                  if (isEditorEmpty(value)) {
                    return 'Enter recipe description';
                  }
                }}
              />
              <FieldArray name='ingredients'>
                {({ push, remove, form }: FieldArrayRenderProps) => {
                  return (
                    <div>
                      <Typography className={classes.recipeIngredientsText}>
                        Recipe ingredients
                      </Typography>
                      <div className={classes.ingredientsContainer}>
                        {props?.values?.ingredients?.map(
                          (ingredient: string, index: number) => {
                            return (
                              <div
                                className={classes.singleIngredient}
                                key={index}
                              >
                                <TextField name={`ingredients.${index}`} />
                                {props.values.ingredients.length - 1 ===
                                  index && (
                                  <div className={classes.ingredientsButtons}>
                                    <IconButton onClick={() => push('')}>
                                      <UilPlus size={16} />
                                    </IconButton>
                                  </div>
                                )}
                                {index !== 0 && (
                                  <div className={classes.ingredientsButtons}>
                                    <IconButton onClick={() => remove(index)}>
                                      <UilTimes size={16} />
                                    </IconButton>
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }}
              </FieldArray>
              <TextField
                name='preparationTime'
                label='Preparation time (in minutes)'
                type='number'
              />
              <RecipeTags name='tags' />
              <Button className={classes.submitButton} type='submit'>
                Submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RecipeSubmit;
