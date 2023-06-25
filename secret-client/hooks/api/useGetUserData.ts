import { useLazyGetUserByAddressQuery } from '@/store/service';
import { useAppSelector } from '@/hooks/stateHooks';
import { useEffect } from 'react';
import { DefaultFetch } from '@/interface/defaultFetch';
import { IUserInfo } from '@/interface/user';

export function useGetUserData(): DefaultFetch<IUserInfo | undefined> {
  const signer = useAppSelector((state) => state.connector.signer);

  const [getUserByAddress, { data, isLoading, isSuccess, isError }] = useLazyGetUserByAddressQuery();

  useEffect(() => {
    if (signer) {
      getUserByAddress(signer.address);
    }
  }, [signer, getUserByAddress]);

  return { data, isLoading, isSuccess, isError };
}
