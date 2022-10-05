import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  id: number;
  @Prop()
  isPublished: boolean;
  @Prop()
  authorId: number;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
