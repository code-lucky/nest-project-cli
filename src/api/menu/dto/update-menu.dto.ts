import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateMenuDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    pid: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    icon: string;

    @ApiProperty()
    perms: string;

    @ApiProperty()
    component: string;

    @ApiProperty()
    menuType: number;

    @ApiProperty()
    @IsNotEmpty()
    sort: number;

    @ApiProperty()
    @IsNotEmpty()
    isShow: number;

    @ApiProperty()
    path: string;
}
