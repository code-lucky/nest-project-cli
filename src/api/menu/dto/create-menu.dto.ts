import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {

    @ApiProperty()
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
    sort: number;

    @ApiProperty()
    isShow: number;

    @ApiProperty()
    path: string;
}
