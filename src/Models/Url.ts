import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Url {
    @Prop()
    originalUrl : string

    @Prop()
    shortUrl : string

    @Prop()
    urlCode : string

    @Prop()
    userId : string

    @Prop()
    clicks : number

    @Prop()
    createdAt: Date

    @Prop()
    expirationTime : Date

    @Prop()
    clicksByReferrer : Array<Object>

    @Prop()
    clicksByTime : Array<Object>
}


export const UrlSchema = SchemaFactory.createForClass(Url);