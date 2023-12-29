import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateRoleDto {

    @ApiProperty()
    @IsNotEmpty({
        message: '角色id不能为空'
    })
    id: number;

    @ApiProperty()
    @IsNotEmpty({
        message: '角色名称不能为空'
    })
    roleName: string;

    @ApiProperty()
    @IsNotEmpty()
    isShow: number;

    @ApiProperty()
    @IsNotEmpty({
        message: '角色权限不能为空'
    })
    rules: number[]
}
