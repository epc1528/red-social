import { ApiProperty } from "@nestjs/swagger"

export class AccessBodyOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;

    @ApiProperty()
    body: []
}

export class AccessOutput {
    @ApiProperty()
    message:string;

    @ApiProperty()
    code: number;
}