import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        description: 'titulo del post',
        maxLength: 100,
        nullable: false,
    })
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    tittle:string;

    @ApiProperty({
        description: 'contenido del post',
        nullable: false,
    })
    @IsString()
    @IsNotEmpty()
    content:string;
}
