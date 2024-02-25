import { Controller, Get, Delete, Body, Put, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';
import { UserDeleteOutput, UserGetOutput, UserUpdateOutput } from './output/user.output';
import { AuthGuard } from 'src/lib/guard/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'informacion del usuario', type: UserGetOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})  
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return plainToClass(UserGetOutput, {message: "user info", code: 200, body: user})
  }

  @ApiResponse({ status: 200, description: 'usuario actualizado', type: UpdateUserDto})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Put(':id') 
  async put(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(+id, updateUserDto);
    return plainToClass(UserUpdateOutput, {message: "user update", code: 200})
  }

  @ApiResponse({ status: 200, description: 'usuario eliminado', type: UserDeleteOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return plainToClass(UserDeleteOutput, {message: "user delete", code: 200})
  }
}
