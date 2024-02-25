import { ApiProperty } from "@nestjs/swagger"

export class UserGetOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;

    @ApiProperty()
    body:[]
}

export class UserUpdateOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number
}

export class UserDeleteOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number
}