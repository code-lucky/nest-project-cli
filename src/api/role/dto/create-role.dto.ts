import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    
    @ApiProperty()
    @IsNotEmpty({
        message: '角色名称不能为空'
    })
    roleName: string;
}
