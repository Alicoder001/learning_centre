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
exports.getTotal = exports.getTeachers = exports.getTeacher = exports.addTeacher = exports.teacherRegister = exports.teacherLogin = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const teacherLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const teacher = yield prisma_1.default.teacher.findUnique({
            where: {
                email,
            },
            include: {
                userType: true,
                adminType: true,
                type: true,
            },
        });
        if (!teacher) {
            return res.status(404).json({ error: 'Email xato!' });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, teacher.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Parol xato' });
        }
        const token = jsonwebtoken_1.default.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });
        res.status(200).json({
            user: {
                token,
                userType: teacher.userType.name,
                fistName: teacher.firstName,
                lastName: teacher.lastName,
                adminType: (_a = teacher.adminType) === null || _a === void 0 ? void 0 : _a.name,
                teacherType: teacher.type.name,
            },
            message: 'Oqituvchi muvaffaqiyatli tizimga kirdi!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.teacherLogin = teacherLogin;
const teacherRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { firstName, lastName, userName, email, password, phone, typeId, adminTypeId, groupId, userTypeId } = req.body;
        const isHasEmail = yield prisma_1.default.teacher.findUnique({
            where: {
                email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.teacher.findUnique({
            where: {
                userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.teacher.findUnique({
            where: {
                phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const isSuperAdmin = yield prisma_1.default.adminType.findUnique({
            where: {
                id: +adminTypeId,
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
        const teacher = yield prisma_1.default.teacher.create({
            data: {
                firstName,
                lastName,
                userName,
                email,
                password: hashPassword,
                phone,
                type: {
                    connect: {
                        id: typeId,
                    },
                },
                userType: {
                    connect: {
                        id: userTypeId,
                    },
                },
                adminType: {
                    connect: {
                        id: adminTypeId,
                    },
                },
            },
            include: {
                type: true,
                userType: true,
                adminType: true,
            },
        });
        if (!teacher) {
            return res.status(500).json({
                error: 'Serverda xatolik yuz berdi!',
            });
        }
        if (groupId) {
            const hasGroupId = yield prisma_1.default.group.findUnique({
                where: {
                    id: groupId,
                },
            });
            if (!hasGroupId) {
                const token = jsonwebtoken_1.default.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });
                return res.status(200).json({
                    user: {
                        token,
                        userType: teacher.userType.name,
                        fistName: teacher.firstName,
                        lastName: teacher.lastName,
                        adminType: (_b = teacher.adminType) === null || _b === void 0 ? void 0 : _b.name,
                        teacherType: teacher.type.name,
                    },
                    message: "O'qituvchi muvaffaqiyatli ro'yxatdan o'tdi!",
                    error: "O'qituvchi guruhga biriktirilmadi!",
                });
            }
            yield prisma_1.default.groupTeacher.create({
                data: {
                    teacherId: teacher.id,
                    groupId: groupId || null,
                },
            });
        }
        const token = jsonwebtoken_1.default.sign({ teacherId: teacher.id }, 'secret', { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({
            user: {
                token,
                userType: teacher.userType.name,
                fistName: teacher.firstName,
                lastName: teacher.lastName,
                adminType: (_c = teacher.adminType) === null || _c === void 0 ? void 0 : _c.name,
                teacherType: teacher.type.name,
            },
            message: "O'qituvchi muvaffaqiyatli ro'yxatdan o'tdi!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.teacherRegister = teacherRegister;
const addTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { firstName, lastName, userName, email, password, phone, typeId, groupId, userTypeId } = req.body;
    try {
        const isHasEmail = yield prisma_1.default.teacher.findUnique({
            where: {
                email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.teacher.findUnique({
            where: {
                userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.teacher.findUnique({
            where: {
                phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const isHasGroup = yield prisma_1.default.teacher.findMany({
            where: {
                type: {
                    id: typeId,
                },
                GroupTeacher: {
                    some: {
                        groupId,
                    },
                },
            },
            include: {
                type: true,
            },
        });
        if (isHasGroup.length > 0) {
            return res.status(409).json({ error: `Tanlagan guruhda ${(_e = (_d = isHasGroup[0]) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.name} mavjud!` });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        // Create the teacher
        const teacher = yield prisma_1.default.teacher.create({
            data: {
                firstName,
                lastName,
                userName,
                email,
                password: hashPassword,
                phone,
                type: {
                    connect: {
                        id: typeId,
                    },
                },
                userType: {
                    connect: {
                        id: userTypeId,
                    },
                },
                // adminType: {
                // 	connect: {
                // 		id: adminTypeId,
                // 	},
                // },
            },
        });
        if (!teacher) {
            return res.status(500).json({
                error: 'Serverda xatolik yuz berdi!',
            });
        }
        if (groupId) {
            const hasGroupId = yield prisma_1.default.group.findUnique({
                where: {
                    id: groupId,
                },
            });
            if (!hasGroupId) {
                return res.status(200).json({
                    message: "O'qituvchi muvaffaqiyatli bazaga qo'shildi!",
                    warning: "O'qituvchi guruhga biriktirilmadi!",
                });
            }
            yield prisma_1.default.groupTeacher.create({
                data: {
                    teacherId: teacher.id,
                    groupId: groupId || null,
                },
            });
        }
        res.status(200).json({ message: "O'qituvchi muvaffaqiyatli bazaga qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Serverda xatolik yuz berdi, Teacher groupga biriktirilmagan bo'lishi mumkin!" });
    }
});
exports.addTeacher = addTeacher;
const getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const token = ((_f = req.headers.authorization) === null || _f === void 0 ? void 0 : _f.split(' ')[1]) || '';
        console.log(token);
        const id = jsonwebtoken_1.default.verify(token, 'secret').teacherId;
        if (!id) {
            return res.status(404).json({ id, error: 'Token xatosi!' });
        }
        const teacher = yield prisma_1.default.teacher.findUnique({
            where: { id },
            include: {
                type: true,
                userType: true,
                adminType: true,
            },
        });
        if (!teacher) {
            return res.status(404).json({ error: 'Admin topilmadi!' });
        }
        res.status(200).json({
            user: {
                token,
                userType: teacher.userType.name,
                fistName: teacher.firstName,
                lastName: teacher.lastName,
                adminType: (_g = teacher.adminType) === null || _g === void 0 ? void 0 : _g.name,
                teacherType: teacher.type.name,
            },
            message: 'Autentifikatsiya muvaffaqiyatli amalga oshirildi!',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getTeacher = getTeacher;
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield prisma_1.default.teacher.findMany({
            include: {
                type: true,
            },
        });
        res.status(200).json(teachers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getTeachers = getTeachers;
const getTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const token = ((_h = req.headers.authorization) === null || _h === void 0 ? void 0 : _h.split(' ')[1]) || '';
        if (!token) {
            return res.status(500).json({ error: 'Token xatosi!' });
        }
        const validToken = jsonwebtoken_1.default.verify(token, 'secret');
        if (!validToken) {
            return res.status(401).json({ error: 'token xato' });
        }
        const id = validToken.teacherId;
        const lessons = yield prisma_1.default.lesson.findMany({
            where: {
                day: new Date().getDate(),
                isAttandance: false,
                group: {
                    GroupTeacher: {
                        some: {
                            teacherId: id,
                        },
                    },
                },
            },
            include: {
                group: {
                    include: {
                        GroupTeacher: {
                            include: {
                                teacher: true,
                            },
                        },
                        dayPart: true,
                        room: true,
                        type: {
                            include: {
                                sciense: true,
                            },
                        },
                    },
                },
            },
        });
        const groups = yield prisma_1.default.group.findMany({
            where: {
                GroupTeacher: {
                    some: {
                        teacherId: id,
                    },
                },
            },
            include: {
                GroupTeacher: {
                    include: {
                        teacher: true,
                    },
                },
                room: true,
                weekPart: true,
                type: {
                    include: {
                        sciense: true,
                    },
                },
                dayPart: true,
                Student: true,
            },
        });
        res.status(200).json({ lessons, groups });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getTotal = getTotal;
