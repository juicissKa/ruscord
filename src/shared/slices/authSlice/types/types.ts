import { IChannel } from "entities/ChannelItem/types/types";

export interface AuthResponse {
  profile: IProfile;
  accessToken: string;
  refreshToken: string;
}

export interface IProfile {
  id: number;
  username: string;
  email: string;
  channels: IChannel[];
}
