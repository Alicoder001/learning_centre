import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';

export const adminChecker = async (req: Request, res: Response, typeName: string) => {
	const token = req.headers.authorization?.split(' ')[1] || '';
	if (!token) {
		return { error: 'Serverda xatolik', status: 500 };
	}
	const validToken = jwt.verify(token, 'secret') as JwtPayload;
	if (!validToken) {
		return { error: 'token xato', status: 500 };
	}
	const id = validToken.adminId;
	const admin = await prisma.admin.findUnique({
		where: {
			id,
			type: {
				name: typeName,
			},
		},
	});
	if (!admin) {
		return { error: 'Autentifikatsiya amalga oshirilmadi!', status: 404 };
	}

	return { admin };
};
