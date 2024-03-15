import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from 'src/Models/Url';
import isValidUrl from '../Shared/commanFuntions';
import * as nanoid from 'nanoid';
import { Model } from 'mongoose';
import { CACHE_MANAGER ,Cache} from '@nestjs/cache-manager';
import { UrlDto } from 'src/Dtos/userDto';

@Injectable()
export class UrlService {
  constructor(
   
    @InjectModel('Url') private urlService: Model<Url>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello check!';
  }

  async validate(headers: any) {
    const token = headers['authorization'].split(' ')[1];

    const decoded = await this.jwtService.verify(token);
    
    return decoded;
  }
  

  async generateShortUrl(bodyInput: any, headres:string) {
    const { urlCode } = bodyInput;
    if (!isValidUrl(urlCode)) {
      return { message: 'Invalid URL format' };
    }
    const user = await this.validate(headres);
    const urlId = nanoid.nanoid();

    const shortUrl = `http://localhost:${3001}/${urlId}`;

    let urlFind = await this.urlService.findOne({ originalUrl: urlCode });
    if (urlFind) {
      return {
        urlCode: urlFind.urlCode,
        originalUrl: urlFind.originalUrl,
        shortUrl: urlFind.shortUrl,
        statusCode: 201,
      };
    } else {
      try {
        // let da = await this.cacheManager.set("urlCode",urlId);
        // console.log(da)
        await this.urlService.create({
          urlCode: urlId,
          originalUrl: urlCode,
          shortUrl: shortUrl,
          createdAt: Math.floor(new Date().getTime()),
          expirationTime: Math.floor(new Date().getTime()) + 10 * 60 * 1000,
          clicks: 0,
          userId: user.userName,
        });

        return {
          urlCode: urlId,
          originalUrl: urlCode,
          shortUrl: shortUrl,
          statusCode: 201,
        };
      } catch (err) {
        return {
          message: err,
          statusCode: 500,
        };
      }
    }
  }

  async redirect(code: any, req: any) {
    // const cacheValue = await this.cacheManager.get("urlCode")
    // console.log(cacheValue)
    try {
      const findObject = await this.urlService.findOne({ urlCode: code });
      const userAgent = req['useragent'];
      if (findObject) {
        let currentTime = Math.floor(new Date().getTime());
        if (currentTime < Math.floor(findObject.expirationTime.getTime())) {
          const url = await this.urlService.updateOne(
            { urlCode: code },
            {
              clicks: findObject.clicks + 1,
              $push: {
                clicksByReferrer: {
                  $each: [
                    {
                      browser: userAgent.browser,
                      device: userAgent.isMobile ? 'Mobile' : 'Desktop',
                      source: userAgent.source,
                    },
                  ],
                },
                clicksByTime: {
                  $each: [
                    {
                      dayData: {
                        day: new Date().getDate(),
                        hourData: {
                          hour: new Date().getHours(),
                          minuteData: {
                            min: new Date().getMinutes(),
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          );
          return { data: findObject.originalUrl, statusCode: 200 };
        } else {
          return { data: 'Link Experied', statusCode: 404 };
        }
      } else {
        return { data: 'UrlCode Not Found', statusCode: 404 };
      }
    } catch (error) {
      return { data: error, statusCode: 500 };
    }
  }

  async analytices(userBody: any, headres: any) {
    let userFind = await this.urlService.findOne({ urlCode: userBody.urlCode });
    let user = await this.validate(headres);
    if (userFind.userId !== user.userName) {
      return {
        message: 'Url Not Accessable for This User',
        statusCode: 404,
      };
    }
    const data = await this.urlService.aggregate([
      {
        $match: {
          urlCode: userBody.urlCode,
        },
      },
      {
        $unwind: '$clicksByTime',
      },
      {
        $group: {
          _id: {
            day: '$clicksByTime.dayData.day',
            hour: '$clicksByTime.dayData.hourData.hour',
            min: '$clicksByTime.dayData.hourData.minuteData.min',
          },
          count: { $sum: 1 },
        },
      },
    ]);

    let aggregatedData = {};

    let filter = userBody.filter;
    data.forEach((item) => {
      if (filter === 'hour') {
        let { day, hour } = item._id;
        let key = `${day}-${hour}`;

        if (!aggregatedData[key]) {
          aggregatedData[key] = {
            day: day,
            hour: hour,
            count: 0,
          };
        }
        aggregatedData[key].count += item.count;
      } else if (filter === 'min') {
        let { day, min, hour } = item._id;
        let key = `${day}-${min}`;

        if (!aggregatedData[key]) {
          aggregatedData[key] = {
            day: day,
            hour: hour,
            min: min,
            count: 0,
          };
        }
        aggregatedData[key].count += item.count;
      } else if (filter === 'day') {
        let { day } = item._id;
        let key = `${day}`;

        if (!aggregatedData[key]) {
          aggregatedData[key] = {
            day: day,
            count: 0,
          };
        }
        aggregatedData[key].count += item.count;
      }
    });

    let result = Object.values(aggregatedData);

    let mostHour = 0;
    for (let key of result) {
      if (key['count'] > mostHour) {
        mostHour = key['count'];
      }
    }

    let mostActive = result.find((value) => value['count'] === mostHour);

    if(mostActive){
      result.push({
        mostActiveHout: mostActive['hour'],
      });
    }

    return result;
  }

  async getSources(userBody: UrlDto, header: any) {
    let userFind = await this.urlService.findOne({ urlCode: userBody.urlCode });
    let user = await this.validate(header);
    if (userFind.userId !== user.userName) {
      return {
        message: 'Url Not Accessable for This User',
        statusCode: 404,
      };
    }

    const data = await this.urlService.aggregate([
      {
        $match: {
          urlCode: userBody.urlCode,
        },
      },
      {
        $unwind: '$clicksByReferrer',
      },
      {
        $group: {
          _id: {
            browser: '$clicksByReferrer.browser',
            device: '$clicksByReferrer.device',
            source: '$clicksByReferrer.source',
          },
          count: { $sum: 1 },
        },
      },
    ]);

    let output = [];

    for (let val of data) {
      output.push({
        browser: val._id.browser,
        device: val._id.device,
        source: val._id.source,
        count:val.count
      });
    }

    return output;
  }
}
