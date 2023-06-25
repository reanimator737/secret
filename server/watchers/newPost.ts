import { BigNumberish, ethers } from 'ethers';
import pool from '../contract/poolAbi.json';
import { orderPostController } from '../controller/orderPost';
import { getRepository } from 'typeorm';
import { TemporaryPost } from '../entity/orderPost';

const ALCHEMY_API_KEY = '4rqyvuKsn8t83wSALeNkec7ltUIHtJ8W';
const POOL_ADDRESS = '0x66822C5C8B0e7bBEaDA80fBdb2C78758b84fC42B';

export function newPostWatcherEvent(): void {
  const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
  const smartContract = new ethers.Contract(POOL_ADDRESS, pool.abi, provider);
  smartContract.on('GenerateNewPost', async (id: BigNumberish, owner: string, value: BigNumberish, secret: string) => {
    const temporaryPostRepo = getRepository(TemporaryPost);
    const temporaryPost = await temporaryPostRepo.findOne({
      where: { secret },
      relations: ['owner', 'categories'],
    });

    if (temporaryPost) {
      await orderPostController.createNewPost(temporaryPost, value, id);
    } else {
      //TODO
    }
  });
}
