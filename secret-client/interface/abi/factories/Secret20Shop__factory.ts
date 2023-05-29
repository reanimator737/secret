/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Secret20Shop, Secret20ShopInterface } from "../Secret20Shop";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_seller",
        type: "address",
      },
    ],
    name: "Sold",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountToSell",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "testTakeAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenBalance",
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
    inputs: [],
    name: "userBalance",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b503060405161001e906100ca565b6100289190610118565b604051809103906000f080158015610044573d6000803e3d6000fd5b506000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610133565b61179380610d7e83390190565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610102826100d7565b9050919050565b610112816100f7565b82525050565b600060208201905061012d6000830184610109565b92915050565b610c3c806101426000396000f3fe6080604052600436106100595760003560e01c80638da5cb5b146101d25780639e1a4d19146101fd578063bf15276514610228578063e4849b3214610253578063fac1e97b1461027c578063fc0c546a14610293576101cd565b366101cd576000349050600081116100a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161009d90610833565b60405180910390fd5b806100af6102be565b10156100f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100e79061089f565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b815260040161014b929190610919565b600060405180830381600087803b15801561016557600080fd5b505af1158015610179573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff167fc54c8cc1c7525b424ec71b685c00d9355581a280488018c22005332ceb2fd406826040516101c39190610942565b60405180910390a2005b600080fd5b3480156101de57600080fd5b506101e7610360565b6040516101f4919061097e565b60405180910390f35b34801561020957600080fd5b506102126102be565b60405161021f9190610942565b60405180910390f35b34801561023457600080fd5b5061023d610386565b60405161024a9190610942565b60405180910390f35b34801561025f57600080fd5b5061027a600480360381019061027591906109ca565b610428565b005b34801561028857600080fd5b5061029161071c565b005b34801561029f57600080fd5b506102a86107b2565b6040516102b59190610a56565b60405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161031a9190610a71565b602060405180830381865afa158015610337573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035b9190610aa1565b905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016103e29190610a71565b602060405180830381865afa1580156103ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104239190610aa1565b905090565b6000811180156104d157508060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161048d9190610a71565b602060405180830381865afa1580156104aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ce9190610aa1565b10155b610510576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050790610b1a565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b815260040161056e929190610b3a565b602060405180830381865afa15801561058b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105af9190610aa1565b9050818110156105f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105eb90610baf565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b815260040161065193929190610bcf565b600060405180830381600087803b15801561066b57600080fd5b505af115801561067f573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156106c9573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167fdc0971a41bd3cc3dec88e610438b1a9f0752975bbd80f195baf7b766c0aec03e836040516107109190610942565b60405180910390a25050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb336107616102be565b6040518363ffffffff1660e01b815260040161077e929190610919565b600060405180830381600087803b15801561079857600080fd5b505af11580156107ac573d6000803e3d6000fd5b50505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600082825260208201905092915050565b7f6e6f7420656e6f7567682066756e647300000000000000000000000000000000600082015250565b600061081d6010836107d6565b9150610828826107e7565b602082019050919050565b6000602082019050818103600083015261084c81610810565b9050919050565b7f6e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b60006108896011836107d6565b915061089482610853565b602082019050919050565b600060208201905081810360008301526108b88161087c565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006108ea826108bf565b9050919050565b6108fa816108df565b82525050565b6000819050919050565b61091381610900565b82525050565b600060408201905061092e60008301856108f1565b61093b602083018461090a565b9392505050565b6000602082019050610957600083018461090a565b92915050565b6000610968826108bf565b9050919050565b6109788161095d565b82525050565b6000602082019050610993600083018461096f565b92915050565b600080fd5b6109a781610900565b81146109b257600080fd5b50565b6000813590506109c48161099e565b92915050565b6000602082840312156109e0576109df610999565b5b60006109ee848285016109b5565b91505092915050565b6000819050919050565b6000610a1c610a17610a12846108bf565b6109f7565b6108bf565b9050919050565b6000610a2e82610a01565b9050919050565b6000610a4082610a23565b9050919050565b610a5081610a35565b82525050565b6000602082019050610a6b6000830184610a47565b92915050565b6000602082019050610a8660008301846108f1565b92915050565b600081519050610a9b8161099e565b92915050565b600060208284031215610ab757610ab6610999565b5b6000610ac584828501610a8c565b91505092915050565b7f696e636f727265637420616d6f756e7400000000000000000000000000000000600082015250565b6000610b046010836107d6565b9150610b0f82610ace565b602082019050919050565b60006020820190508181036000830152610b3381610af7565b9050919050565b6000604082019050610b4f60008301856108f1565b610b5c60208301846108f1565b9392505050565b7f636865636b20616c6c6f77616e63650000000000000000000000000000000000600082015250565b6000610b99600f836107d6565b9150610ba482610b63565b602082019050919050565b60006020820190508181036000830152610bc881610b8c565b9050919050565b6000606082019050610be460008301866108f1565b610bf160208301856108f1565b610bfe604083018461090a565b94935050505056fea2646970667358221220c73607a56ba43a4b0ac393d08fa480fb83160b59e9b85ad8eb99f8f44907321664736f6c6343000812003360806040523480156200001157600080fd5b506040516200179338038062001793833981810160405281019062000037919062000304565b6040518060400160405280600b81526020017f536563726574546f6b656e0000000000000000000000000000000000000000008152506040518060400160405280600681526020017f53656372657400000000000000000000000000000000000000000000000000008152506103e8838360049081620000b89190620005b0565b508260059081620000ca9190620005b0565b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200011e82826200012960201b60201c565b5050505050620007b2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614620001bc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001b390620006f8565b60405180910390fd5b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200020d919062000749565b925050819055508160008082825462000227919062000749565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516200028e919062000795565b60405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002cc826200029f565b9050919050565b620002de81620002bf565b8114620002ea57600080fd5b50565b600081519050620002fe81620002d3565b92915050565b6000602082840312156200031d576200031c6200029a565b5b60006200032d84828501620002ed565b91505092915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003b857607f821691505b602082108103620003ce57620003cd62000370565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004387fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620003f9565b620004448683620003f9565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004916200048b62000485846200045c565b62000466565b6200045c565b9050919050565b6000819050919050565b620004ad8362000470565b620004c5620004bc8262000498565b84845462000406565b825550505050565b600090565b620004dc620004cd565b620004e9818484620004a2565b505050565b5b81811015620005115762000505600082620004d2565b600181019050620004ef565b5050565b601f82111562000560576200052a81620003d4565b6200053584620003e9565b8101602085101562000545578190505b6200055d6200055485620003e9565b830182620004ee565b50505b505050565b600082821c905092915050565b6000620005856000198460080262000565565b1980831691505092915050565b6000620005a0838362000572565b9150826002028217905092915050565b620005bb8262000336565b67ffffffffffffffff811115620005d757620005d662000341565b5b620005e382546200039f565b620005f082828562000515565b600060209050601f83116001811462000628576000841562000613578287015190505b6200061f858262000592565b8655506200068f565b601f1984166200063886620003d4565b60005b8281101562000662578489015182556001820191506020850194506020810190506200063b565b868310156200068257848901516200067e601f89168262000572565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b6000620006e0600c8362000697565b9150620006ed82620006a8565b602082019050919050565b600060208201905081810360008301526200071381620006d1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000756826200045c565b915062000763836200045c565b92508282019050808211156200077e576200077d6200071a565b5b92915050565b6200078f816200045c565b82525050565b6000602082019050620007ac600083018462000784565b92915050565b610fd180620007c26000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806370a082311161007157806370a082311461014057806394bf804d1461017057806395d89b411461018c5780639dc29fac146101aa578063a9059cbb146101c6578063dd62ed3e146101e2576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100e857806323b872dd14610106578063313ce56714610122575b600080fd5b6100b6610212565b6040516100c39190610ba7565b60405180910390f35b6100e660048036038101906100e19190610c62565b6102a4565b005b6100f061038e565b6040516100fd9190610cb1565b60405180910390f35b610120600480360381019061011b9190610ccc565b610397565b005b61012a61058f565b6040516101379190610cb1565b60405180910390f35b61015a60048036038101906101559190610d1f565b610598565b6040516101679190610cb1565b60405180910390f35b61018a60048036038101906101859190610d4c565b6105e1565b005b610194610749565b6040516101a19190610ba7565b60405180910390f35b6101c460048036038101906101bf9190610c62565b6107db565b005b6101e060048036038101906101db9190610c62565b61092c565b005b6101fc60048036038101906101f79190610d8c565b610a90565b6040516102099190610cb1565b60405180910390f35b60606004805461022190610dfb565b80601f016020809104026020016040519081016040528092919081815260200182805461024d90610dfb565b801561029a5780601f1061026f5761010080835404028352916020019161029a565b820191906000526020600020905b81548152906001019060200180831161027d57829003601f168201915b5050505050905090565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f6e11fb1b7f119e3f2fa29896ef5fdf8b8a2d0d4df6fe90ba8668e7d8b2ffa25e836040516103829190610cb1565b60405180910390a35050565b60008054905090565b8281806103a383610598565b10156103e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103db90610e78565b60405180910390fd5b82600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104709190610ec7565b9250508190555082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104c69190610ec7565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461051c9190610efb565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef856040516105809190610cb1565b60405180910390a35050505050565b60006012905090565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610671576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066890610f7b565b60405180910390fd5b81600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106c09190610efb565b92505081905550816000808282546106d89190610efb565b925050819055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161073d9190610cb1565b60405180910390a35050565b60606005805461075890610dfb565b80601f016020809104026020016040519081016040528092919081815260200182805461078490610dfb565b80156107d15780601f106107a6576101008083540402835291602001916107d1565b820191906000526020600020905b8154815290600101906020018083116107b457829003601f168201915b5050505050905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461086b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086290610f7b565b60405180910390fd5b81818061087783610598565b10156108b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108af90610e78565b60405180910390fd5b82600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109079190610ec7565b925050819055508260008082825461091f9190610ec7565b9250508190555050505050565b33818061093883610598565b1015610979576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097090610e78565b60405180910390fd5b82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546109c89190610ec7565b9250508190555082600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a1e9190610efb565b925050819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051610a829190610cb1565b60405180910390a350505050565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610b51578082015181840152602081019050610b36565b60008484015250505050565b6000601f19601f8301169050919050565b6000610b7982610b17565b610b838185610b22565b9350610b93818560208601610b33565b610b9c81610b5d565b840191505092915050565b60006020820190508181036000830152610bc18184610b6e565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bf982610bce565b9050919050565b610c0981610bee565b8114610c1457600080fd5b50565b600081359050610c2681610c00565b92915050565b6000819050919050565b610c3f81610c2c565b8114610c4a57600080fd5b50565b600081359050610c5c81610c36565b92915050565b60008060408385031215610c7957610c78610bc9565b5b6000610c8785828601610c17565b9250506020610c9885828601610c4d565b9150509250929050565b610cab81610c2c565b82525050565b6000602082019050610cc66000830184610ca2565b92915050565b600080600060608486031215610ce557610ce4610bc9565b5b6000610cf386828701610c17565b9350506020610d0486828701610c17565b9250506040610d1586828701610c4d565b9150509250925092565b600060208284031215610d3557610d34610bc9565b5b6000610d4384828501610c17565b91505092915050565b60008060408385031215610d6357610d62610bc9565b5b6000610d7185828601610c4d565b9250506020610d8285828601610c17565b9150509250929050565b60008060408385031215610da357610da2610bc9565b5b6000610db185828601610c17565b9250506020610dc285828601610c17565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610e1357607f821691505b602082108103610e2657610e25610dcc565b5b50919050565b7f6e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b6000610e62601183610b22565b9150610e6d82610e2c565b602082019050919050565b60006020820190508181036000830152610e9181610e55565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610ed282610c2c565b9150610edd83610c2c565b9250828203905081811115610ef557610ef4610e98565b5b92915050565b6000610f0682610c2c565b9150610f1183610c2c565b9250828201905080821115610f2957610f28610e98565b5b92915050565b7f6e6f7420616e206f776e65720000000000000000000000000000000000000000600082015250565b6000610f65600c83610b22565b9150610f7082610f2f565b602082019050919050565b60006020820190508181036000830152610f9481610f58565b905091905056fea26469706673582212204645352f52278020f6d1c9889c729da9c6f8107dbe6d241d232f9dc583fdc4a264736f6c63430008120033";

type Secret20ShopConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Secret20ShopConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Secret20Shop__factory extends ContractFactory {
  constructor(...args: Secret20ShopConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string }
  ): Promise<Secret20Shop> {
    return super.deploy(overrides || {}) as Promise<Secret20Shop>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Secret20Shop {
    return super.attach(address) as Secret20Shop;
  }
  override connect(signer: Signer): Secret20Shop__factory {
    return super.connect(signer) as Secret20Shop__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Secret20ShopInterface {
    return new utils.Interface(_abi) as Secret20ShopInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Secret20Shop {
    return new Contract(address, _abi, signerOrProvider) as Secret20Shop;
  }
}