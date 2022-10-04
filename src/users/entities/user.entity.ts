import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  userName: string;
  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
