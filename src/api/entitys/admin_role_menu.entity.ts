import { Column } from "typeorm";

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
