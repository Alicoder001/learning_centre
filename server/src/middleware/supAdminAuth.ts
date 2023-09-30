import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
export interface customRequest extends Request {
	adminId: Number;
}

const supAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.token;
		console.log(req);
		if (!token) {
			return res.status(500).json({ error: 'Serverda xatolik?????' });
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
			include: {
				type: true,
			},
		});
		if (!admin) {
			return res.status(404).json({ error: 'Autentifikatsiya amalga oshirilmadi!' });
		}
		if (admin.type.name !== 'super') {
			return res.status(404).json({ error: 'Sizda bu vakolat mavjud emas!' });
		}
		(req as customRequest).adminId = admin.id;
		next();
	} catch (error) {
		res.status(500).json('Serverda xatolik yuz berdi!');
	}
};
export default supAdminAuth;
