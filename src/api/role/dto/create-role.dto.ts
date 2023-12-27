import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    
    @ApiProperty()
    @IsNotEmpty({
        message: '角色名称不能为空'
    })
    roleName: string;

    @ApiProperty()
    isShow: boolean;

    @ApiProperty()
    @IsNotEmpty({
        message: '请选择角色权限'
    })
    rules: number[];
}
