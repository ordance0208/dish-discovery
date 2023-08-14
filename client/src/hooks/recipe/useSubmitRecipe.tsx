import * as Yup from 'yup';
import { Descendant } from 'slate';
import { createRecipe } from '../../endpoints/recipe';
import { RecipeFields } from '../../models/recipe/recipePayload';
import { IResponse } from '../../models/response';

const useSubmitRecipe = (
  setRecipeSubmitted: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const initialValues = {
    title: '',
    description: [
      { type: 'paragraph', children: [{ text: '' }] },
    ] as unknown as Descendant[],
    ingredients: [''],
    preparationTime: 0,
    tags: [],
  };

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
    recipeImage: File,
    setSubmitting: (isSubmitting: boolean) => void,
    setResponse: React.Dispatch<React.SetStateAction<IResponse | undefined>>
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('recipe', recipeImage);
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
      const data = await createRecipe(formData);
      setRecipeSubmitted(data._id);
    } catch (err: any) {
      setResponse({ text: err.response.data.error, severity: 'warning' });
    } finally {
      setSubmitting(false);
    }
  };

  return { initialValues, validationSchema, onSubmit };
};

export default useSubmitRecipe;
