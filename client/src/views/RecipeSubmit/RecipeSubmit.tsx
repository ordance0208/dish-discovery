import { useState } from 'react';
import {
  FieldArray,
  FieldArrayRenderProps,
  Formik,
  FormikProps,
  Field,
  FormikHelpers,
} from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { Theme, useTheme } from '@mui/material';
import { TEXT_DARK } from '../../theme';
import { makeStyles } from '@mui/styles';
import useSubmitRecipe from '../../hooks/recipe/useSubmitRecipe';
import { isEditorEmpty } from '../../utils/editor.helpers';
import { RecipeFields } from '../../models/recipe/recipePayload';
import { PATHS } from '../../routes';
import { UilPlus, UilTimes, UilCheckCircle } from '@iconscout/react-unicons';
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
    [theme.breakpoints.down('xl')]: {
      maxWidth: '90%',
      width: '90%',
    },
  },
  submitRecipeHeading: {
    color: TEXT_DARK,
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
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      width: '100%',
    },
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
  successfulSubmission: {
    height: 'calc(100vh - 142px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successfulSubmissionText: {
    color: TEXT_DARK,
    fontSize: 32,
    fontWeight: 400,
    margin: '32px 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: 24,
  },
  alert: {
    marginTop: 16,
  },
}));

const RecipeSubmit = () => {
  const theme = useTheme();
  const classes = useStyles();
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [recipeSubmitted, setRecipeSubmitted] = useState<string | null>(null);

  const { initialValues, validationSchema, onSubmit } = useSubmitRecipe(
    setRecipeSubmitted,
    id
  );

  const handleFormSubmit = (
    values: RecipeFields,
    { setSubmitting }: FormikHelpers<RecipeFields>
  ) => {
    onSubmit(values, file!, setSubmitting);
  };

  return (
    <div className={classes.root}>
      <>
        {!recipeSubmitted ? (
          <>
            <Typography className={classes.submitRecipeHeading}>
              {!id ? 'Submit a recipe' : 'Edit recipe'}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize
            >
              {(props: FormikProps<RecipeFields>) => {
                return (
                  <form className={classes.form} onSubmit={props.handleSubmit}>
                    <TextField name='title' label='Title' />
                    <Field
                      component={Droppable}
                      name='file'
                      customError={'Submit a recipe image'}
                      fileError={
                        props.submitCount > 0 && !file && !props.values.image
                      }
                      setFile={setFile}
                      text='Drag and drop or click to upload a recipe image'
                      image={props.values.image}
                      validate={() => {
                        if (!file && !props.values.image) {
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
                            <Typography
                              className={classes.recipeIngredientsText}
                            >
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
                                      <TextField
                                        name={`ingredients.${index}`}
                                      />
                                      {props.values.ingredients.length - 1 ===
                                        index && (
                                        <div
                                          className={classes.ingredientsButtons}
                                        >
                                          <IconButton onClick={() => push('')}>
                                            <UilPlus size={16} />
                                          </IconButton>
                                        </div>
                                      )}
                                      {index !== 0 && (
                                        <div
                                          className={classes.ingredientsButtons}
                                        >
                                          <IconButton
                                            onClick={() => remove(index)}
                                          >
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
                    <Button
                      className={classes.submitButton}
                      type='submit'
                      disabled={props.isSubmitting}
                    >
                      Submit
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </>
        ) : (
          <div className={classes.successfulSubmission}>
            <UilCheckCircle size={150} color={theme.palette.primary.main} />
            <Typography className={classes.successfulSubmissionText}>
              {id
                ? 'Your recipe was updated successfully'
                : 'Your recipe was submitted successfully!'}
            </Typography>
            <div className={classes.buttonGroup}>
              <Button
                variant='contained'
                onClick={() =>
                  navigate(`${PATHS.SPECIFIC_RECIPE}/${recipeSubmitted}`)
                }
              >
                Go to recipe
              </Button>
              <Button
                variant='text'
                onClick={() => navigate(PATHS.RECIPES)}
                textColor={TEXT_DARK}
              >
                Browse other recipes
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default RecipeSubmit;
