import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginByEmailDto{
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({
        message: '邮箱不能为空'
    })
    email: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '验证码不能为空'
    })
    captcha: string;
}