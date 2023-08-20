import { useEffect } from 'react';

const useDocumentTitle = (documentTitle: string) => {
  const titleSuffix = 'Dish Discovery';

  useEffect(() => {
    window.document.title = `${documentTitle} - ${titleSuffix}`;
  }, [documentTitle]);
};

export default useDocumentTitle;
