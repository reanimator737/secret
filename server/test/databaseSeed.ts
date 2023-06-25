import { createConnection, getRepository } from 'typeorm';
import { Comment } from '../entity/comment';
import { CommentRate } from '../entity/commentRate';
import { User } from '../entity/user';
import { OrderPost, TemporaryPost } from '../entity/orderPost';
import { Category } from '../entity/category';

const userAddress = [
  '0xcBbCEB2C58a4eacF971c09D0c8CdD10f5923f01B',
  '0x5BFd953f2f8b965973B7f8e9285D48c2DC6faa84',
  '0xf846Dd84d092437aFd3Ba8E0fa52F743C382824f',
  '0x3Bcba2b8C675851f123e25cD45ae2F86946f0fB6',
  '0x39695abE2353e0f0d9D5C9eD0250b64D607D4FD7',
  '0x17E5fEE89D3560ccA1CE9B871dc17365FEbFBF1d',
];

const categories = [
  'Front-end',
  'JS',
  'TS',
  'REACT',
  'Angular',
  'Next',
  'Vue',
  'Svelte',
  'Back-end',
  'C#',
  'C++',
  'Java',
  'Web3',
  'Solidity',
  'Python',
  'Design',
  'DevOps',
  'Docker',
];

createConnection({
  type: 'postgres',
  host: '0.0.0.0',
  port: 5433,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [Comment, CommentRate, User, OrderPost, TemporaryPost, Category],
}).then(() => {
  const userRepository = getRepository(User);
  userAddress.forEach(async (address) => {
    const user = userRepository.create({ address, rate: 0 });
    await userRepository.save(user);
  });

  const categoryRepository = getRepository(Category);
  categories.forEach(async (name) => {
    const category = categoryRepository.create({ name });
    await categoryRepository.save(category);
  });
});
