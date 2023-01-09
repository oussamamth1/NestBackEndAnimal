import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  AfterLoad,
} from 'typeorm';


@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, name: 'email', unique: true })
  email!: string;

  @Column({ nullable: false })
  //@MinLength(4)
  //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @Column({ nullable: true })
  roles: string;

  @Column({ nullable: true })
  confirmationToken: string;

  @Column({ nullable: true })
  userType: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, type: 'timestamp' }) // Recommended
  confirmedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  birthDate: Date;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
    default: () => null,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  modifiedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  removedAt: Date;

  /* @AfterLoad()
  async foreignKey() {
    delete this.userType;
    delete this.roles;
    delete this.picture;
    delete this.confirmationToken;
    delete this.birthDate;

    delete this.gender;
    delete this.password;
  }*/
}
