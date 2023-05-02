import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_PROJECT_ID');
const contractAddress = '0x1234567890123456789012345678901234567890';
const contract = new ethers.Contract(contractAddress, contractABI, provider);

contract.on('GenerateNewPost', (id, owner, value) => {
  console.log(`Новый пост создан: id=${id}, owner=${owner}, value=${value}`);
});

app.post('/api/verify', (req, res) => {
  const message = req.body.message;
  const signature = req.body.signature;
  const address = req.body.address;

  const messageBytes = web3.utils.utf8ToHex(message);
  const messageHash = web3.utils.sha3(`\x19Ethereum Signed Message:\n${messageBytes.length}${messageBytes}`);
  const recoveredAddress = web3.eth.accounts.recover(messageHash, signature);

  if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
    return res.status(200).json({ message: 'Адрес кошелька MetaMask принадлежит пользователю' });
  } else {
    return res.status(403).json({ message: 'Адрес кошелька MetaMask не принадлежит пользователю' });
  }
});
