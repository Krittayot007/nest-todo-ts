import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser() {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async createUser(input: Prisma.UserCreateInput) {
    try {
      const user = await this.prismaService.user.create({
        data: input,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async updateUser(input: Prisma.UserUpdateInput, id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException();
      }
      const updateUser = await this.prismaService.user.update({
        data: input,
        where: { id },
      });
      return updateUser;
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        throw new NotFoundException();
      }
      throw new BadRequestException();
    }
  }

  async deleteUser(id: number) {
    try {
      const deleteUser = await this.prismaService.user.delete({
        where: { id },
      });
      return deleteUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
