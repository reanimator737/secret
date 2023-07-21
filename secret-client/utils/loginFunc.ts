import { AppDispatch } from '@/store';
import { ethers } from 'ethers';
import { setProvider, setSigner } from '@/store/connector';

export async function tryGetSigner(dispatch: AppDispatch) {
  // @ts-ignore
  if (window.ethereum === null) {
    console.log('MetaMask not installed; using read-only defaults');
    let provider = new ethers.EtherscanProvider();
    dispatch(setProvider(provider));
  } else {
    try {
      // @ts-ignore
      let provider = new ethers.BrowserProvider(window.ethereum);

      let signer = await provider.getSigner();
      dispatch(setSigner(signer));
    } catch (e) {
      console.log(e);
    }
  }
}
