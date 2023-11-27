import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        name: 'status',
        comment: '角色状态',
        default: 0
    })
    status: number;

    @CreateDateColumn({name: 'create_time'})
    createTime: Date;

    @UpdateDateColumn({name: 'update_time'})
    updateTime: Date;
}
