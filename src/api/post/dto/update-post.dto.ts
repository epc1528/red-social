import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePostDto {
    @ApiProperty({
        description: 'titulo del post',
        maxLength: 100,
        nullable: false,
    })
    @IsString()
    @MaxLength(100)
    @IsOptional()
    tittle?:string;

    @ApiProperty({
        description: 'contenido del post',
        nullable: false,
    })
    @IsString()
    @IsOptional()
    content?:string;
}