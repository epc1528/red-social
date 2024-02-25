import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, IsEmail } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({
        description: 'nombre completo del usuario',
        minLength: 2,
        maxLength: 60,
        nullable: false,
    })
    @IsString()
    @MinLength(2)
    @MaxLength(60)
    @IsNotEmpty()
    fullName:string;

    @ApiProperty({
        description: 'edad del usuario',
        nullable: false,
    })
    @IsNumber()
    @IsNotEmpty()
    age:number;

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
