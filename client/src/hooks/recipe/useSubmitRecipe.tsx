import * as Yup from 'yup';

const useSubmitRecipe = () => {
  const initialValues = {
    title: '',
    description: [{ type: 'paragraph', children: [{ text: '' }] }],
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

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return { initialValues, validationSchema, onSubmit };
};

export default useSubmitRecipe;
