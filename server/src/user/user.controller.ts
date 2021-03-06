import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@prisma/client'
import { GetCurrentUser } from 'src/utils/decorators'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.getAll()
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: number) {
    return this.userService.getUserById(userId)
  }

  @Post('changeAvatar')
  @UseInterceptors(FileInterceptor('file'))
  changeAvatar(@GetCurrentUser() user: User, @UploadedFile() file) {
    return this.userService.changeAvatar(user, file)
  }

  @Post('updateInfo')
  updateInfo(@GetCurrentUser() user: User, @Body() updateInfo) {
    return this.userService.updateInfo(user, updateInfo)
  }
}
