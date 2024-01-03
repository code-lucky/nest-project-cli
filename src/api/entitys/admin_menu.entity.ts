import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'admin_menu'
})
export class AdminMenu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '父级id'
    })
    pid: number;

    @Column({
        comment: '名称',
        nullable: true
    })
    name: string;

    @Column({
        comment: '图标',
        nullable: true
    })
    icon: string;

    @Column({
        comment: '权限标识',
        nullable: true
    })
    perms: string;

    @Column({
        comment: '组件路径',
        nullable: true
    })
    component: string;

    @Column({
        comment: '路由路径',
        nullable: true
    })
    path: string;

    @Column({
        name: 'menu_type',
        comment: '类型，0-目录，1-菜单，2-按钮',
        nullable: true
    })
    menuType: number;

    @Column({
        comment: '排序',
        default: 999
    })
    sort: number;

    @Column({
        name: 'is_show',
        comment: '是否显示',
        default: 0
    })
    isShow: number;

    @Column({
        name: 'is_delete',
        comment: '是否删除',
        default: 0
    })
    isDelete: number;

    @CreateDateColumn({
        name: 'create_time',
        comment: '创建时间'
    })
    createTime: Date;

    @UpdateDateColumn({
        name: 'update_time',
        comment: '删除时间'
    })
    updateTime: Date;
}