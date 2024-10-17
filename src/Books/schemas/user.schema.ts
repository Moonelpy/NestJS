import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  public email: string;

  @Prop()
  public firstName: string;

  @Prop({ required: true })
  public lastname: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
