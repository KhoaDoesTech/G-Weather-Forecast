import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  city: string[];

  @Prop({ default: false })
  isConfirmed: boolean;

  @Prop({ default: false })
  subscribed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
