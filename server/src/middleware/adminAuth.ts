import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
export interface customRequest extends Request {
	adminId: Number;
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.token;
		if (!token) {
			return res.status(500).json({ error: 'Serverda xatolik!' });
		}
		const validToken = jwt.verify(token, 'secret') as JwtPayload;
		if (!validToken) {
			return res.status(401).json({ error: 'token xato' });
		}
		const id = validToken.adminId;
		const admin = await prisma.admin.findUnique({
			where: {
				id,
			},
		});
		if (!admin) {
			return res.status(404).json({ error: 'Autentifikatsiya amalga oshirilmadi!' });
		}
		(req as customRequest).adminId = admin.id;
		next();
	} catch (error) {
		res.status(500).json('Serverda xatolik yuz berdi!');
	}
};
export default adminAuth;
