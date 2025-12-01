//props for auth screen
export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
	Verification: { email: string };
	SussessRegistartion: undefined;
	ForgotPassword: undefined;
	ResetPasswordVerification: { email: string };
	NewPassword: { email: string; code: string };
	SuccessResetPassword: undefined;
};

//props for products stack
export type ProductsStackParamList = {
	ProductsList: undefined;
	ProductDetails: { productId: string };
	CartScreen: undefined;
	EditCartScreen: { productId: string };
	EditOrderScreen: { orderId: string };
	SuccessPayment: undefined;
};

//props for screen with nav-tab
export type MainTabParamList = {
	Products: undefined;
	Orders: undefined;
	Settings: undefined;
};
