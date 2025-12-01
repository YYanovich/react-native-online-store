import { mainAxios } from './mainAxios';

export interface UserProfile {
	id: string;
	email: string;
	fullName: string | null;
	phoneNumber: string | null;
	shippingAddress: string | null;
}

export interface UpdateProfileData {
	fullName?: string;
	phoneNumber?: string;
	shippingAddress?: string;
}

export interface ChangePasswordData {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

class UserService {
	async getProfile(): Promise<UserProfile> {
		const response = await mainAxios.get<UserProfile>('/user/profile');
		return response.data;
	}

	async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
		const response = await mainAxios.patch<UserProfile>('/user/profile', data);
		return response.data;
	}

	async changePassword(data: ChangePasswordData): Promise<{ success: boolean }> {
		const response = await mainAxios.patch<{ success: boolean }>('/user/change-password', data);
		return response.data;
	}

	async deleteAccount(): Promise<{ success: boolean }> {
		const response = await mainAxios.delete<{ success: boolean }>('/user/account');
		return response.data;
	}
}

export const userService = new UserService();
