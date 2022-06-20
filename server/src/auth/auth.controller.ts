import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common'
import { User } from '@prisma/client'
import { GetCurrentUser, Public } from 'src/utils/decorators'

import { AuthService } from './auth.service'
import { SignUpDto, SignInDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signin')
  signinLocal(@Body() dto: SignInDto) {
    return this.authService.signinLocal(dto)
  }

  @Public()
  @Post('local/signup')
  signupLocal(@Body() dto: SignUpDto) {
    return this.authService.signupLocal(dto)
  }

  @Public()
  @Get('activate/:link')
  @Redirect(`${process.env.CLIENT_URL}/auth`, 302)
  async activate(@Param('link') link: string) {
    await this.authService.activateUser(link)
  }

  @Get('checkauth')
  async checkAuth(@GetCurrentUser() user: User) {
    return await this.authService.checkAuth(user)
  }
}
