import { ApiProperty } from "@nestjs/swagger";

class Role{
    @ApiProperty()
    id: number;

    @ApiProperty()
    roleName: string;

    @ApiProperty()
    status: number;

    @ApiProperty()
    createTime: Date;

    @ApiProperty()
    updateTime: Date;
}

export class RoleListVo{

    @ApiProperty({
        type: [Role]
    })
    roleList: Role[]

}

