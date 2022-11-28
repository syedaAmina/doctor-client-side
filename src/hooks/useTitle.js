import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Dr Helal - ${title}`;
  }, [title]);
};

export default useTitle;
