/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SecretToken, SecretTokenInterface } from "../SecretToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "shop",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approve",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "shop",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200179338038062001793833981810160405281019062000037919062000304565b6040518060400160405280600b81526020017f536563726574546f6b656e0000000000000000000000000000000000000000008152506040518060400160405280600681526020017f53656372657400000000000000000000000000000000000000000000000000008152506103e8838360049081620000b89190620005b0565b508260059081620000ca9190620005b0565b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011e82826200012960201b60201c565b5050505050620007b2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614620001bc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001b390620006f8565b60405180910390fd5b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200020d919062000749565b925050819055508160008082825462000227919062000749565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516200028e919062000795565b60405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002cc826200029f565b9050919050565b620002de81620002bf565b8114620002ea57600080fd5b50565b600081519050620002fe81620002d3565b92915050565b6000602082840312156200031d576200031c6200029a565b5b60006200032d84828501620002ed565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003b857607f821691505b602082108103620003ce57620003cd62000370565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004387fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620003f9565b620004448683620003f9565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004916200048b62000485846200045c565b62000466565b6200045c565b9050919050565b6000819050919050565b620004ad8362000470565b620004c5620004bc8262000498565b84845462000406565b825550505050565b600090565b620004dc620004cd565b620004e9818484620004a2565b505050565b5b81811015620005115762000505600082620004d2565b600181019050620004ef565b5050565b601f82111562000560576200052a81620003d4565b6200053584620003e9565b8101602085101562000545578190505b6200055d6200055485620003e9565b830182620004ee565b50505b505050565b600082821c905092915050565b6000620005856000198460080262000565565b1980831691505092915050565b6000620005a0838362000572565b9150826002028217905092915050565b620005bb8262000336565b67ffffffffffffffff811115620005d757620005d662000341565b5b620005e382546200039f565b620005f082828562000515565b600060209050601f83116001811462000628576000841562000613578287015190505b6200061f858262000592565b8655506200068f565b601f1984166200063886620003d4565b60005b8281101562000662578489015182556001820191506020850194506020810190506200063b565b868310156200068257848901516200067e601f89168262000572565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b6000620006e0600c8362000697565b9150620006ed82620006a8565b602082019050919050565b600060208201905081810360008301526200071381620006d1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000756826200045c565b915062000763836200045c565b92508282019050808211156200077e576200077d6200071a565b5b92915050565b6200078f816200045c565b82525050565b6000602082019050620007ac600083018462000784565b92915050565b610fd180620007c26000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806370a082311161007157806370a082311461014057806394bf804d1461017057806395d89b411461018c5780639dc29fac146101aa578063a9059cbb146101c6578063dd62ed3e146101e2576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100e857806323b872dd14610106578063313ce56714610122575b600080fd5b6100b6610212565b6040516100c39190610ba7565b60405180910390f35b6100e660048036038101906100e19190610c62565b6102a4565b005b6100f061038e565b6040516100fd9190610cb1565b60405180910390f35b610120600480360381019061011b9190610ccc565b610397565b005b61012a61058f565b6040516101379190610cb1565b60405180910390f35b61015a60048036038101906101559190610d1f565b610598565b6040516101679190610cb1565b60405180910390f35b61018a60048036038101906101859190610d4c565b6105e1565b005b610194610749565b6040516101a19190610ba7565b60405180910390f35b6101c460048036038101906101bf9190610c62565b6107db565b005b6101e060048036038101906101db9190610c62565b61092c565b005b6101fc60048036038101906101f79190610d8c565b610a90565b6040516102099190610cb1565b60405180910390f35b60606004805461022190610dfb565b80601f016020809104026020016040519081016040528092919081815260200182805461024d90610dfb565b801561029a5780601f1061026f5761010080835404028352916020019161029a565b820191906000526020600020905b81548152906001019060200180831161027d57829003601f168201915b5050505050905090565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f6e11fb1b7f119e3f2fa29896ef5fdf8b8a2d0d4df6fe90ba8668e7d8b2ffa25e836040516103829190610cb1565b60405180910390a35050565b60008054905090565b8281806103a383610598565b10156103e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103db90610e78565b60405180910390fd5b82600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104709190610ec7565b9250508190555082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104c69190610ec7565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461051c9190610efb565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516105809190610cb1565b60405180910390a35050505050565b60006012905090565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610671576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066890610f7b565b60405180910390fd5b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106c09190610efb565b92505081905550816000808282546106d89190610efb565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161073d9190610cb1565b60405180910390a35050565b60606005805461075890610dfb565b80601f016020809104026020016040519081016040528092919081815260200182805461078490610dfb565b80156107d15780601f106107a6576101008083540402835291602001916107d1565b820191906000526020600020905b8154815290600101906020018083116107b457829003601f168201915b5050505050905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461086b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086290610f7b565b60405180910390fd5b81818061087783610598565b10156108b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108af90610e78565b60405180910390fd5b82600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109079190610ec7565b925050819055508260008082825461091f9190610ec7565b9250508190555050505050565b33818061093883610598565b1015610979576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097090610e78565b60405180910390fd5b82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109c89190610ec7565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a1e9190610efb565b925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051610a829190610cb1565b60405180910390a350505050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610b51578082015181840152602081019050610b36565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b7982610b17565b610b838185610b22565b9350610b93818560208601610b33565b610b9c81610b5d565b840191505092915050565b60006020820190508181036000830152610bc18184610b6e565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bf982610bce565b9050919050565b610c0981610bee565b8114610c1457600080fd5b50565b600081359050610c2681610c00565b92915050565b6000819050919050565b610c3f81610c2c565b8114610c4a57600080fd5b50565b600081359050610c5c81610c36565b92915050565b60008060408385031215610c7957610c78610bc9565b5b6000610c8785828601610c17565b9250506020610c9885828601610c4d565b9150509250929050565b610cab81610c2c565b82525050565b6000602082019050610cc66000830184610ca2565b92915050565b600080600060608486031215610ce557610ce4610bc9565b5b6000610cf386828701610c17565b9350506020610d0486828701610c17565b9250506040610d1586828701610c4d565b9150509250925092565b600060208284031215610d3557610d34610bc9565b5b6000610d4384828501610c17565b91505092915050565b60008060408385031215610d6357610d62610bc9565b5b6000610d7185828601610c4d565b9250506020610d8285828601610c17565b9150509250929050565b60008060408385031215610da357610da2610bc9565b5b6000610db185828601610c17565b9250506020610dc285828601610c17565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610e1357607f821691505b602082108103610e2657610e25610dcc565b5b50919050565b7f6e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b6000610e62601183610b22565b9150610e6d82610e2c565b602082019050919050565b60006020820190508181036000830152610e9181610e55565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ed282610c2c565b9150610edd83610c2c565b9250828203905081811115610ef557610ef4610e98565b5b92915050565b6000610f0682610c2c565b9150610f1183610c2c565b9250828201905080821115610f2957610f28610e98565b5b92915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b6000610f65600c83610b22565b9150610f7082610f2f565b602082019050919050565b60006020820190508181036000830152610f9481610f58565b905091905056fea26469706673582212204645352f52278020f6d1c9889c729da9c6f8107dbe6d241d232f9dc583fdc4a264736f6c63430008120033";

type SecretTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SecretTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SecretToken__factory extends ContractFactory {
  constructor(...args: SecretTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    shop: string,
    overrides?: Overrides & { from?: string }
  ): Promise<SecretToken> {
    return super.deploy(shop, overrides || {}) as Promise<SecretToken>;
  }
  override getDeployTransaction(
    shop: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(shop, overrides || {});
  }
  override attach(address: string): SecretToken {
    return super.attach(address) as SecretToken;
  }
  override connect(signer: Signer): SecretToken__factory {
    return super.connect(signer) as SecretToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SecretTokenInterface {
    return new utils.Interface(_abi) as SecretTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SecretToken {
    return new Contract(address, _abi, signerOrProvider) as SecretToken;
  }
}
