import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAdminMenuDto{

    @ApiProperty()
    @IsNotEmpty({
        message: '父级id不能为空'
    })
    pid: number;

    @ApiProperty()
    icon: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '组件路径不能为空'
    })
    component: string;

    @ApiProperty()
    sort: number;
}