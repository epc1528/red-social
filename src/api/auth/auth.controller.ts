import { Controller, Get, Post, Body, UseGuards, Headers, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessDto } from './dto/access.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserCreateOutput } from './output/create-user.output';
import { AccessBodyOutput, AccessOutput } from './output/access.output';
import { AuthGuard } from 'src/lib/guard/auth.guard';
import { AuthRefreshGuard } from 'src/lib/guard/auth-refresh.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'usuario creado', type: UserCreateOutput})
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);
    return plainToClass(UserCreateOutput, {message: "User Accepted", code: 200})
  }

  @ApiResponse({ status: 200, description: 'usuario creado', type: AccessBodyOutput})
  @Post('login')
  async login(@Body() access: AccessDto) {
    const login = await this.authService.login(access);
    return plainToClass(AccessBodyOutput, {message: "Access Accepted", code: 200, body: login})
  }

  @ApiResponse({ status: 200, description: 'logout', type: AccessOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Body() access: AccessDto) {
    await this.authService.logout(access);
    return plainToClass(AccessOutput, {message: "Logout Accepted", code: 200})
  }

  @ApiResponse({ status: 200, description: 'refresh', type: AccessBodyOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthRefreshGuard)
  @Get('refres')
  async refresh(@Req() req: Request | any ) {
    const user = req['user']
    const refresh = await this.authService.refresh(user);
    return plainToClass(AccessBodyOutput, {message: "Refresh Accepted", code: 200, body: refresh})
  }
}
