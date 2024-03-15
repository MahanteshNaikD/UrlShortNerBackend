export interface UserDto {
  userName: string;
  password: string;
}

export interface UrlDto {
  originalUrl: string;
  shortUrl: string;
  urlCode: string;
  userId: string;
  clicks: number;
  createdAt: Date;
  expirationTime: Date;
  clicksByReferrer: Array<Object>;
  clicksByTime: Array<Object>;
}
