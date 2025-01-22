export interface User {
  _id: string;
  username: string;
  email: string;
  balance: number;
  bitcoin: number;
  dash: number;
  monero: number;
  ethereum: number;
  xrp: number;
  tether: number;
  bitcoinCash: number;
  bitcoinSV: number;
  litecoin: number;
  eos: number;
  binancecoin: number;
  tezos: number;
  role: string;
  profile_picture: string | null;
  enrolled_courses: any[];
  rewards: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  preferences?: {
      notifications: boolean;
      dark_mode: boolean;
  };
}