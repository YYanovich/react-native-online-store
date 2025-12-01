import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
	private readonly sender: string;

	constructor() {
		const apiKey = process.env.SENDGRID_API_KEY;
		if (!apiKey) {
			throw new Error('SENDGRID_API_KEY is not set');
		}
		sgMail.setApiKey(apiKey);

		const sender = process.env.SENDGRID_SENDER;
		if (!sender) {
			throw new Error('SENDGRID_SENDER is not set');
		}
		this.sender = sender;
	}

	async sendVerificationCode(email: string, code: string): Promise<void> {
		const msg = {
			to: email,
			from: this.sender,
			subject: 'Your verification code',
			text: `Your verification code is: ${code}.`,
		};

		await sgMail.send(msg);
	}

	async sendPasswordResetCode(email: string, code: string): Promise<void> {
		const msg = {
			to: email,
			from: this.sender,
			subject: 'Password Reset Code',
			text: `Your password reset code is: ${code}.`,
		};

		await sgMail.send(msg);
	}
}
