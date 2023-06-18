import { ChangeEvent, useCallback, useState } from 'react';

interface DefaultField<T> {
  id: string;
  value: T;
  error: null | string;
  hasError: () => Promise<boolean>;
}

interface TextField<T> extends DefaultField<T> {
  handleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleBlur: () => void;
}

function useTextFormField<T>(id: string, validators: Validator<string>[], init = ''): TextField<T> {
  const [value, setValue] = useState(init);
  const [error, setError] = useState<ValidationResult>(null);

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const val = event.target.value;

      setValue(val);
      setError(await validateValue(val, validators));
    },
    [validators],
  );

  const handleBlur = useCallback(async () => {
    setError(await validateValue(value, validators));
  }, [value, validators]);

  const hasError = useCallback(async () => {
    const err = await validateValue(value, validators);
    setError(err);

    return !!err;
  }, [value, validators]);

  return {
    id,
    value,
    error,
    hasError,
    handleChange,
    handleBlur,
  };
}

export default useTextFormField;
