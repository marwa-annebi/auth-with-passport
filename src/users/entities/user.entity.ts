import { Role } from 'src/roles/role.enum';
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
  @Prop()
  roles?: Role[];
  @Prop()
  isAdmin?: boolean;
  @Prop()
  id?: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
