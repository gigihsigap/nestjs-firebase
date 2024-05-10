import { IsEmail } from 'class-validator';
import crypto from 'crypto';
import {
  Entity,
  EntityDTO,
  EntityRepositoryType,
  Opt,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { UserRepository } from './user.repository';

@Entity({ repository: () => UserRepository })
export class User {

  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id!: number;

  @Property() // Reference to Firebase UID
  uid!: string;

  @Property()
  username!: string;

  @Property({ hidden: true })
  @IsEmail()
  email!: string;

  @Property({ type: 'date', nullable: true })
  latest_login?: Date;

  @Property({ type: 'date', nullable: true })
  deleted_at?: Date;

  // @Property({ hidden: true })
  // password: string;

  constructor(uid: string, email: string, username: string) {
    this.uid = uid;
    this.email = email;
    this.username = username;
    this.latest_login = new Date();
    // this.password = crypto.createHmac('sha256', password).digest('hex');
  }

  toJSON(user?: User) {
    const o = wrap<User>(this).toObject() as UserDTO;
    // o.image = this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    // o.following = user && user.followers.isInitialized() ? user.followers.contains(this) : false; // TODO or followed?

    return o;
  }

}

interface UserDTO extends EntityDTO<User> {
  following?: boolean;
}
