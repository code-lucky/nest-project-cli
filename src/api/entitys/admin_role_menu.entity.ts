import { Column, Entity } from "typeorm";

@Entity({
    name: 'admin_role_menu'
})
export class AdminRoleMenu {

    @Column({
        comment: 'roleId'
    })
    id: number;

    @Column({
        comment: '权限id'
    })
    rid: number;
}
