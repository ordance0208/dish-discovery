import Joi from 'joi';

export const recipePayloadSchema = Joi.object({
  title: Joi.string().min(2).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(1).required(),
  description: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().valid('paragraph').required(),
        children: Joi.array()
          .items(Joi.object({ text: Joi.string().allow('') }))
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
  preparationTime: Joi.number().integer().required(),
  tags: Joi.array().items(Joi.string().min(1)).min(1).required(),
});

export const isEditorEmpty = (value: any) => {
  const mapped = value?.map((node: any) => {
    return node?.children?.reduce(
      (acc: any, current: any) =>
        current?.text !== undefined
          ? acc + current?.text
          : acc + current?.children?.[0]?.text,
      ''
    );
  });

  return mapped.join('').trim() === '';
};
