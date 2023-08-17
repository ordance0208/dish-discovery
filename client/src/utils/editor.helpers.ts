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
