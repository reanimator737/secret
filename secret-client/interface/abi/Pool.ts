/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace Pool {
  export type UserActivityStruct = {
    likes: BigNumberish;
    hasOwnerLike: boolean;
    user: string;
  };

  export type UserActivityStructOutput = [BigNumber, boolean, string] & {
    likes: BigNumber;
    hasOwnerLike: boolean;
    user: string;
  };
}

export interface PoolInterface extends utils.Interface {
  functions: {
    "createNewPost(uint256,uint256,bytes32)": FunctionFragment;
    "withdraw(uint256,uint256,(uint256,bool,address)[],address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "createNewPost" | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createNewPost",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      BigNumberish,
      BigNumberish,
      Pool.UserActivityStruct[],
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "createNewPost",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "GenerateNewPost(uint256,address,uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GenerateNewPost"): EventFragment;
}

export interface GenerateNewPostEventObject {
  _id: BigNumber;
  _owner: string;
  value: BigNumber;
  secret: string;
}
export type GenerateNewPostEvent = TypedEvent<
  [BigNumber, string, BigNumber, string],
  GenerateNewPostEventObject
>;

export type GenerateNewPostEventFilter = TypedEventFilter<GenerateNewPostEvent>;

export interface Pool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createNewPost(
      _value: BigNumberish,
      _lifeTime: BigNumberish,
      _secret: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    withdraw(
      _totalLikes: BigNumberish,
      _totalOwnerLikes: BigNumberish,
      _userActivity: Pool.UserActivityStruct[],
      _owner: string,
      _postId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  createNewPost(
    _value: BigNumberish,
    _lifeTime: BigNumberish,
    _secret: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  withdraw(
    _totalLikes: BigNumberish,
    _totalOwnerLikes: BigNumberish,
    _userActivity: Pool.UserActivityStruct[],
    _owner: string,
    _postId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    createNewPost(
      _value: BigNumberish,
      _lifeTime: BigNumberish,
      _secret: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      _totalLikes: BigNumberish,
      _totalOwnerLikes: BigNumberish,
      _userActivity: Pool.UserActivityStruct[],
      _owner: string,
      _postId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "GenerateNewPost(uint256,address,uint256,bytes32)"(
      _id?: BigNumberish | null,
      _owner?: string | null,
      value?: null,
      secret?: null
    ): GenerateNewPostEventFilter;
    GenerateNewPost(
      _id?: BigNumberish | null,
      _owner?: string | null,
      value?: null,
      secret?: null
    ): GenerateNewPostEventFilter;
  };

  estimateGas: {
    createNewPost(
      _value: BigNumberish,
      _lifeTime: BigNumberish,
      _secret: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    withdraw(
      _totalLikes: BigNumberish,
      _totalOwnerLikes: BigNumberish,
      _userActivity: Pool.UserActivityStruct[],
      _owner: string,
      _postId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createNewPost(
      _value: BigNumberish,
      _lifeTime: BigNumberish,
      _secret: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _totalLikes: BigNumberish,
      _totalOwnerLikes: BigNumberish,
      _userActivity: Pool.UserActivityStruct[],
      _owner: string,
      _postId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
