import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import * as moment from 'jalali-moment';
// import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { HydratedDocument,Document } from 'mongoose';


export class BaseEntity extends Document{
    
    @Prop({
        type: Date,
        default: moment().locale('fa').format('YYYY-M-D HH:mm:ss')
    })
    createdAtFa: Date;


    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: new Date()
    })
    updatedAt: Date;
}