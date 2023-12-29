import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminUser } from "./admin_user.entity";
import { AdminRoleMenu } from "./admin_role_menu.entity";

@Entity({
    name: 'admin_role'
})
export class AdminRole {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'role_name',
        length: 255,
        comment: '角色名称'
    })
    roleName: string;

    @Column({
        comment: '等级',
        default: 0
    })
    level: number;

    @Column({
        comment:'角色状态,0显示，1隐藏',
        default: 0
    })
    status: number;

    @CreateDateColumn({name: 'create_time'})
    createTime: Date;

    @UpdateDateColumn({name: 'update_time'})
    updateTime: Date;

    @OneToMany(()=>AdminUser, user=> user.roleList)
    user: AdminUser;

    @OneToMany(()=>AdminRoleMenu, roleMenu=> roleMenu.roleMenuList)
    roleMenu: AdminRoleMenu;
}
