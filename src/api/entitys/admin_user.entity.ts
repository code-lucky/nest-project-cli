import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminRole } from "./admin_role.entity";

@Entity({
    name: 'admin_user'
})
export class AdminUser{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_name',
        comment: '用户名称'
    })
    userName: string;

    @Column({
        comment: '用户密码'
    })
    password: string;

    @Column({
        name: 'head_pic',
        comment: '用户头像',
        nullable: true
    })
    headPic: string;

    @Column({
        name: 'role_id',
        comment: '关联角色表id'
    })
    roleId: number;

    @Column({
        name: 'phone_number',
        comment: '手机号码',
        length: 20,
        nullable: true
    })
    phoneNumber: string;

    @Column({
        comment: '邮箱',
        nullable: true
    })
    email: string;

    @Column({
        comment: '用户状态',
        default: 0
    })
    status: number;

    @Column({
        name: 'is_delete',
        comment: '用户逻辑删除0是正常状态，1是删除',
        default: 0
    })
    isDelete: number;

    @CreateDateColumn({
        name: 'create_time'
    })
    createTime: Date;

    @CreateDateColumn({
        name: 'update_time'
    })
    updateTime: Date;

    @ManyToOne(()=>AdminRole, role=> role.user)
    @JoinColumn({name:'role_id', referencedColumnName:'id'})
    roleList:AdminRole;
}