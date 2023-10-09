import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
export interface customRequest extends Request {
	adminId: Number;
}

const teacherAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || '';
		if (!token) {
			return res.status(500).json({ error: 'Token xatosi!' });
		}
		const validToken = jwt.verify(token, 'secret') as JwtPayload;
		if (!validToken) {
			return res.status(401).json({ error: 'token xato' });
		}
		const id = validToken.teacherId;
		const admin = await prisma.teacher.findUnique({
			where: {
				id,
			},
		});
		if (!admin) {
			return res.status(404).json({ error: 'Autentifikatsiya amalga oshirilmadi!' });
		}
		next();
	} catch (error) {
		res.status(500).json('Autentifikatsiya amalga oshirilmadi!');
	}
};
export default teacherAuth;
