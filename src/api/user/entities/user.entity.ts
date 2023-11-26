import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'user'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        comment: '用户名'
    })
    username: string;

    @Column({
        length: 50,
        comment: '密码'
    })
    password: string;

    @Column({
        length: 50,
        comment: '昵称',
        nullable: true
    })
    nickName: string;

    @Column({
        length: 50,
        comment: '邮箱',
        nullable: true
    })
    email: string;

    @Column({
        length: 255,
        comment: '头像',
        nullable: true
    })
    headPic: string;

    @Column({
        length: 50,
        comment: '手机号',
        nullable: true
    })
    phoneNumber: string;

    @Column({
        comment: '是否冻结',
        default: false
    })
    isFrozen: boolean;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

}
