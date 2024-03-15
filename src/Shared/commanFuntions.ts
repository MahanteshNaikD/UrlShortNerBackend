import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export default function isValidUrl(url) {
  const urlRegex = /^(http|https):\/\/[\w.-]+(?:\.[\w.-]+)*[\w.-]+\//;
  return urlRegex.test(url);
}




// export const RedisOptions: CacheModuleAsyncOptions = {
//     isGlobal: true,
//     imports: [ConfigModule],
//     useFactory: async (configService: ConfigService) => {
//       const store = await redisStore({
//         socket: {
//           host: configService.get<string>('1000'),
//           port: parseInt(configService.get<string>('1000')!),
//         },
//       });
//       return {
//         store: () => store,
//       };
//     },
//     inject: [ConfigService],
//   };





