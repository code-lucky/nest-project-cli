import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name:'admin_role_menu'
})
export class AdminRoleMenu{

    @PrimaryColumn({
        comment: '角色id'
    })
    id: number;

    @PrimaryColumn({
        comment: '权限id'
    })
    rid: number;
}