import { ApiProperty } from "@nestjs/swagger"

export class PostResponseBodyOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;

    @ApiProperty()
    body: Object;
}

export class PostResponseOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;
}