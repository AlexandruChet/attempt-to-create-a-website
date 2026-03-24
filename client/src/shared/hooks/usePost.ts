import { useState } from "react";

export const usePost = (Port: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sendRequest = async (dataToSend: FormData, onSuccess?: () => void) => {
    setIsLoading(true);
    setErr(null);
    try {
      const response = await fetch(`http://localhost:${Port}/api/save-form`, {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        setErr(response.statusText);
      }
    } catch (err) {
      setErr("Network Error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, err };
};
