import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/stateHooks';
import { setSignMsg } from '@/store/user';
import { Nullable } from '@/interface/baseType';

export const useSign = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { signMsg, signer } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setHasError(false);
    setErrorMsg('');

    if (signMsg === null && signer) {
      setIsLoading(true);
      const message = 'wallet verify';
      signer
        .signMessage(message)
        .then((msg) => {
          setIsLoading(false);

          if (msg) {
            dispatch(setSignMsg(msg));
          } else {
            setIsLoading(false);
            setHasError(true);
            setErrorMsg('Something go wrong');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setHasError(true);
          setErrorMsg(err?.info?.error?.message ?? 'Something go wrong');
        });
    }
    //TODO signMsg?
  }, [signer, signMsg, dispatch]);

  return useMemo(() => ({ signMsg, isLoading, hasError, errorMsg }), [signMsg, isLoading, hasError, errorMsg]);
};

export const useGetSign = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { signMsg, signer } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const call = useCallback(async (): Promise<Nullable<string>> => {
    if (signMsg === null && signer) {
      setIsLoading(true);
      const message = 'wallet verify';
      try {
        const signMessage = await signer.signMessage(message);
        dispatch(setSignMsg(signMessage));
        setIsLoading(false);
        return signMessage;
      } catch (e: any) {
        setIsLoading(false);
        setHasError(true);
        setErrorMsg(e?.info?.error?.message ?? 'Something go wrong');
        return null;
      }
    }
    //TODO: need sign
    return null;
  }, [signMsg, signer]);

  //TODO test this one
  return useMemo(() => ({ call, isLoading, hasError, errorMsg }), [isLoading, hasError, errorMsg, call]);
};
