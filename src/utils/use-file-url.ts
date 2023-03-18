import { useState, useEffect } from 'react';

export function useFileUrl(file: Blob) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (file != null) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const result = e.target?.result;

        if (result != null && typeof result === 'string') {
          setUrl(result);
        }
      };

      fileReader.readAsDataURL(file);
      return () => {
        fileReader.abort();
      };
    }
  }, [file]);

  return url;
}
