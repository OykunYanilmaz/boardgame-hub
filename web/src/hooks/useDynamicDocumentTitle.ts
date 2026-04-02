import { useEffect } from "react";

const APP_NAME = "Board Game Hub";
const SEPERATOR = " - "

const useDynamicDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = APP_NAME + SEPERATOR + title;
  }, [title]);
}

export default useDynamicDocumentTitle;
