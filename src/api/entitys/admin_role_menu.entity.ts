import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { AdminRole } from "./admin_role.entity";

@Entity({
    name: 'admin_role_menu'
})
export class AdminRoleMenu {

    @PrimaryColumn({
        comment: 'roleId'
    })
    id: number;

    @PrimaryColumn({
        comment: '权限id'
    })
    rid: number;

    @ManyToOne(()=>AdminRole, role=> role.roleMenu)
    @JoinColumn({name:'id', referencedColumnName:'id'})
    roleMenuList: AdminRole;
}
