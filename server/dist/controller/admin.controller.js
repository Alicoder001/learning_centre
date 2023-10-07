"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.getAdmin = exports.addAdmin = exports.adminRegister = exports.adminLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield prisma_1.default.admin.findUnique({
            where: {
                email,
            },
            include: {
                type: true,
                userType: true,
            },
        });
        if (!admin) {
            return res.status(404).json({ error: 'Email xato!' });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, admin.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Parol xato' });
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({
            user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
            message: 'Admin muvaffaqiyatli tizimga kirdi!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.adminLogin = adminLogin;
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email, password, phone, typeId, userTypeId } = req.body;
        const isHasEmail = yield prisma_1.default.admin.findUnique({
            where: {
                email: email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.admin.findUnique({
            where: {
                userName: userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.admin.findUnique({
            where: {
                phone: phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const isTeacherAdmin = yield prisma_1.default.adminType.findUnique({
            where: {
                id: +typeId,
                name: 'teacher',
            },
        });
        if (isTeacherAdmin) {
            return res.status(409).json({ error: "Admin teacher tipida bo'la olmaydi" });
        }
        const isSuperAdmin = yield prisma_1.default.adminType.findUnique({
            where: {
                id: +typeId,
                name: 'super',
            },
        });
        const isHasSuperAdmin = yield prisma_1.default.adminType.findFirst({
            where: {
                OR: [
                    {
                        Admin: {
                            some: {
                                typeId: isSuperAdmin === null || isSuperAdmin === void 0 ? void 0 : isSuperAdmin.id,
                            },
                        },
                    },
                    {
                        Teacher: {
                            some: {
                                typeId: isSuperAdmin === null || isSuperAdmin === void 0 ? void 0 : isSuperAdmin.id,
                            },
                        },
                    },
                ],
            },
        });
        if (isSuperAdmin && isHasSuperAdmin) {
            return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const admin = yield prisma_1.default.admin.create({
            data: { firstName, lastName, userName, email, password: hashPassword, phone, typeId, userTypeId },
            include: {
                type: true,
                userType: true,
            },
        });
        if (!admin) {
            return res.status(500).json({
                error: 'Serverda xatolik yuz berdi!',
            });
        }
        const token = jsonwebtoken_1.default.sign({ adminId: admin.id }, 'secret', { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({
            user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
            message: "Admin muvaffaqiyatli ro'yxatdan o'tdi!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.adminRegister = adminRegister;
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const isHasEmail = yield prisma_1.default.admin.findUnique({
            where: {
                email: data.email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.admin.findUnique({
            where: {
                userName: data.userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.admin.findUnique({
            where: {
                phone: data.phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const isTeacherAdmin = yield prisma_1.default.adminType.findUnique({
            where: {
                id: +data.typeId,
                name: 'teacher',
            },
        });
        if (isTeacherAdmin) {
            return res.status(409).json({ error: "Admin teacher tipida bo'la olmaydi!" });
        }
        const isSuperAdmin = yield prisma_1.default.adminType.findUnique({
            where: {
                id: +data.typeId,
                name: 'super',
            },
        });
        const isHasSuperAdmin = yield prisma_1.default.adminType.findFirst({
            where: {
                OR: [
                    {
                        Admin: {
                            some: {
                                typeId: isSuperAdmin === null || isSuperAdmin === void 0 ? void 0 : isSuperAdmin.id,
                            },
                        },
                    },
                    {
                        Teacher: {
                            some: {
                                typeId: isSuperAdmin === null || isSuperAdmin === void 0 ? void 0 : isSuperAdmin.id,
                            },
                        },
                    },
                ],
            },
        });
        if (isSuperAdmin && isHasSuperAdmin) {
            return res.status(409).json({ error: 'Super admin allaqachon mavjud!' });
        }
        const hashPassword = yield bcrypt_1.default.hash(data.password, 10);
        const admin = yield prisma_1.default.admin.create({
            data: Object.assign(Object.assign({}, data), { password: hashPassword }),
        });
        if (!admin) {
            return res.status(500).json({
                error: 'Serverda xatolik yuz berdi!',
            });
        }
        res.status(200).json({ message: "Admin muvaffaqiyatli qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.addAdmin = addAdmin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        const id = jsonwebtoken_1.default.verify(token, 'secret').adminId;
        if (!id) {
            return res.status(404).json({ error: 'Token xatosi!' });
        }
        const admin = yield prisma_1.default.admin.findUnique({
            where: { id },
            include: {
                type: true,
                userType: true,
            },
        });
        if (!admin) {
            return res.status(404).json({ error: 'Admin topilmadi!' });
        }
        res.status(200).json({
            user: { token, userType: admin.userType.name, fistName: admin.firstName, lastName: admin.lastName, adminType: admin.type.name },
            message: 'Autentifikatsiya muvaqffaqiyatli amalga oshirildi!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getAdmin = getAdmin;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield prisma_1.default.admin.findMany({
            where: {
                type: {
                    name: {
                        not: 'super',
                    },
                },
            },
        });
        if (!admins || (admins === null || admins === void 0 ? void 0 : admins.length) === 0) {
            return res.status(404).json({ error: "Adminlar yo'q!" });
        }
        res.status(200).json({ admins });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getAdmins = getAdmins;
