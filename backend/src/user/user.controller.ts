import { Controller, Get, Patch, Delete, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService, UserProfile } from './user.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto';
import { AtGuard } from '../auth/guards/at.guard';
import { GetCurrentUserId } from '../auth/decorators/get-current-user-id.decorator';

@Controller('user')
@UseGuards(AtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@GetCurrentUserId() userId: string): Promise<UserProfile> {
    if (!userId) {
      throw new BadRequestException('User ID not found in token');
    }
    return this.userService.getProfile(userId);
  }

  @Patch('profile')
  async updateProfile(
    @GetCurrentUserId() userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserProfile> {
    if (!userId) {
      throw new BadRequestException('User ID not found in token');
    }
    return this.userService.updateProfile(userId, dto);
  }

  @Patch('change-password')
  async changePassword(
    @GetCurrentUserId() userId: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    if (!userId) {
      throw new BadRequestException('User ID not found in token');
    }
    return this.userService.changePassword(userId, dto);
  }

  @Delete('account')
  async deleteAccount(@GetCurrentUserId() userId: string): Promise<{ success: boolean }> {
    if (!userId) {
      throw new BadRequestException('User ID not found in token');
    }
    return this.userService.deleteAccount(userId);
  }
}
