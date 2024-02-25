import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/lib/guard/auth.guard';
import { plainToClass } from 'class-transformer';
import { PostResponseBodyOutput, PostResponseOutput } from './output/post-response.output';
import { IUser } from './interface/user.interfsce';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('post')
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: 200, description: 'lista de post', type: PostResponseBodyOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Get(':page/:take')
  async findAll(@Param('page') page: string, @Param('take') take: string) {
    const post = await this.postService.findAll(+page, +take);
    return plainToClass(PostResponseBodyOutput, {message: "post info", code: 200, body: post})
  }

  @ApiResponse({ status: 200, description: 'post creado', type: PostResponseOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request | any) {
    const user = req.body['user']
    const post = await this.postService.create(createPostDto, user);
    return plainToClass(PostResponseOutput, {message: "Post created", code: 200})
  }


  @ApiResponse({ status: 200, description: 'Like post', type: PostResponseOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Put('like/:id')
  async addLike(@Param('id') id: string) {
    await this.postService.addLike(+id);
    return plainToClass(PostResponseOutput, {message: "Like Add", code: 200})
  }

  @ApiResponse({ status: 200, description: 'post actualizado', type: PostResponseOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request | any) {
    const user = req['user']
    await this.postService.update(+id, updatePostDto, user);
    return plainToClass(PostResponseOutput, {message: "post update", code: 200})
  }

  @ApiResponse({ status: 200, description: 'post elimiado', type: PostResponseOutput})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(+id);
    return plainToClass(PostResponseOutput, {message: "post delete", code: 200})
  }
}
