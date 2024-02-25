import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AccessDto {
    @ApiProperty({
        description: 'correo del usuario',
        minLength: 11,
        nullable: false,
    })
    @IsString()
    @MinLength(11)
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({
        description: 'contraseña del usuario',
        minLength: 6,
        maxLength: 20,
        nullable: false,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEmpty()
    password:string;
}
