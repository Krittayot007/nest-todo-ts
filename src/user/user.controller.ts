import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getall')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('get-by-id/:id')
  getUserById(@Param() params: { id: number }) {
    const getId = +params.id;
    return this.userService.getUserById(getId);
  }

  @Post('create-user')
  createUser(@Body() input: Prisma.UserCreateInput) {
    return this.userService.createUser(input);
  }

  @Patch('update-user/:id')
  updateUser(
    @Body() input: Prisma.UserUpdateInput,
    @Param() params: { id: number },
  ) {
    const getId = +params.id;
    return this.userService.updateUser(input, getId);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param() params: { id: number }) {
    const getId = +params.id;
    return this.userService.deleteUser(getId);
  }
}
