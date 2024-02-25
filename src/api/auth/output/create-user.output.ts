import { ApiProperty } from "@nestjs/swagger"

export class UserCreateOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;
}