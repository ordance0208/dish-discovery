import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Descendant } from 'slate';
import useSnackbar from '../../hooks/useSnackbar';
import {
  createRecipe,
  editRecipe,
  getSingleRecipeForEdit,
} from '../../endpoints/recipe';
import { RecipeFields } from '../../models/recipe/recipePayload';
import { PATHS } from '../../routes';

const useSubmitRecipe = (
  setRecipeSubmitted: React.Dispatch<React.SetStateAction<string | null>>,
  id: string | undefined
) => {
  const queueSnackbar = useSnackbar();
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: [
      { type: 'paragraph', children: [{ text: '' }] },
    ] as unknown as Descendant[],
    ingredients: [''],
    preparationTime: 0,
    tags: [],
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (!id && !isEqual(formValues, initialValues))
      return setFormValues(initialValues);
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const recipe = await getSingleRecipeForEdit(id);
        const {
          title,
          description,
          ingredients,
          preparationTime,
          tags,
          image,
        } = recipe;

        const recipeData = {
          title,
          description,
          ingredients,
          preparationTime,
          tags,
          image,
        };
        setFormValues(recipeData);
      } catch (err: any) {
        queueSnackbar({ text: err.response.data.error, severity: 'error' });
        navigate(PATHS.RECIPES, { replace: true });
      }
    };

    fetchRecipe();
    // eslint-disable-next-line
  }, [id]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Enter recipe title'),
    ingredients: Yup.array()
      .min(1, 'Enter at least one ingredient')
      .of(
        Yup.string()
          .min(1, 'Enter at least one ingredient')
          .required('Enter an ingredient')
      )
      .required(),
    preparationTime: Yup.number()
      .min(1, 'Enter the preparation time')
      .required('Enter the preparation time'),
    tags: Yup.array()
      .min(1, 'Enter at least one tag')
      .of(Yup.string())
      .required(),
  });

  const onSubmit = async (
    values: RecipeFields,
    recipeImage: File | undefined,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append('title', values.title);
    recipeImage && formData.append('recipe', recipeImage);
    formData.append(
      'preparationTime',
      values.preparationTime as unknown as string
    );

    values.tags.forEach((tag: string, index: number) => {
      formData.append(`tags[${index}]`, tag);
    });

    values.ingredients.forEach((ingredient: string, index: number) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });

    values.description.forEach((row: any, index: number) => {
      formData.append(`description[${index}][type]`, row.type);
      row.children.forEach((children: any, i: number) => {
        formData.append(
          `description[${index}][children][${i}][text]`,
          children.text as string
        );
      });
    });

    try {
      if (id) {
        const data = await editRecipe(id, formData);
        setRecipeSubmitted(data._id);
      } else {
        const data = await createRecipe(formData);
        setRecipeSubmitted(data._id);
      }
    } catch (err: any) {
      queueSnackbar({ text: err.response.data.error, severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return { initialValues: formValues, validationSchema, onSubmit };
};

export default useSubmitRecipe;
