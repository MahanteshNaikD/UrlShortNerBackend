import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  UseGuards,
  Headers,
  Res,
  Query,
  Req,
} from '@nestjs/common';
import { UrlService } from '../Url/url.service';
import { AuthGuard } from '../Auth/auth.guard';
import { Throttle } from '@nestjs/throttler';
import { UrlDto } from '../Dtos/userDto';

@Controller('Url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  getHello(): string {
    return this.urlService.getHello();
  }


  @UseGuards(AuthGuard)
  @Post('generateUrl')
  @Header('Content-Type', 'application/json')
  generateShortUrl(@Body() userBody: UrlDto, @Headers() header) {
    return this.urlService.generateShortUrl(userBody,header);
  }



  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Header('Content-Type', 'application/json')
  @Get('code')
  async redirect(
    @Res() res,
    @Query('code')
    code: string,
    @Req() req: Request
  ) {
    const url = await this.urlService.redirect(code,req);
    if (url.statusCode === 200) {
      return res.redirect(url.data);
    } else {
      return res.send(url);
    }
  }


  @UseGuards(AuthGuard)
  @Header('Content-Type', 'application/json')
  @Post('analytics')
  async analytices(@Body() userBody: any, @Headers() header){
     return this.urlService.analytices(userBody,header);
  }


  @UseGuards(AuthGuard)
  @Header('Content-Type', 'application/json')
  @Post('getSources')
  async getSources(@Body() userBody: UrlDto, @Headers() header){
     return this.urlService.getSources(userBody,header);
  }
}
