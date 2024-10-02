import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public text: string;

  @Prop()
  public authors: string;

  @Prop()
  public favorite: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
