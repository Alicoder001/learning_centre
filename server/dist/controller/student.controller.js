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
exports.getStudentByGroup = exports.getStudents = exports.getStudent = exports.addStudent = exports.studentRegister = exports.studentLogin = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.studentLogin = studentLogin;
const studentRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { firstName, lastName, userName, email, password, phone, studentId, groupId, userTypeId } = req.body;
        const isHasEmail = yield prisma_1.default.student.findUnique({
            where: {
                email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.student.findUnique({
            where: {
                userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.student.findUnique({
            where: {
                phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const student = yield prisma_1.default.student.create({
            data: {
                firstName,
                lastName,
                userName,
                email: email || null,
                password: hashPassword,
                phone,
                studentId,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
                userType: {
                    connect: {
                        id: userTypeId,
                    },
                },
            },
            include: {
                userType: true,
                group: true,
            },
        });
        const token = jsonwebtoken_1.default.sign({ studentId: student.id }, 'secret', { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({
            user: {
                token,
                fistName: student.firstName,
                lastName: student.lastName,
                userType: student.userType.name,
                groupName: (_a = student.group) === null || _a === void 0 ? void 0 : _a.name,
                adminType: null,
            },
            message: "Student muvaffaqiyatli ro'yxatdan o'tdi!",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.studentRegister = studentRegister;
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, userName, email, password, phone, studentId, groupId, userTypeId } = req.body;
        const isHasEmail = yield prisma_1.default.student.findUnique({
            where: {
                email,
            },
        });
        if (isHasEmail) {
            return res.status(409).json({ error: 'Bu email allaqachon mavjud!' });
        }
        const isHasUserName = yield prisma_1.default.student.findUnique({
            where: {
                userName,
            },
        });
        if (isHasUserName) {
            return res.status(409).json({ error: 'Bunday userName mavjud!' });
        }
        const isHasPhone = yield prisma_1.default.student.findUnique({
            where: {
                phone,
            },
        });
        if (isHasPhone) {
            return res.status(409).json({ error: 'Bunday telefon raqam mavjud!' });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma_1.default.student.create({
            data: {
                firstName,
                lastName,
                userName,
                email: email,
                password: hashPassword,
                phone,
                studentId,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
                userType: {
                    connect: {
                        id: userTypeId,
                    },
                },
            },
        });
        res.status(200).json({ message: "Student bazaga qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.addStudent = addStudent;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || '';
        const id = jsonwebtoken_1.default.verify(token, 'secret').studentId;
        if (id) {
            return res.status(404).json({ error: 'Token xatosi!' });
        }
        const student = yield prisma_1.default.student.findUnique({
            where: { id },
        });
        if (!student) {
            return res.status(404).json({ error: 'Student topilmadi!' });
        }
        res.status(200).json({ student });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getStudent = getStudent;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield prisma_1.default.student.findMany({
            include: {
                Muster: true,
                group: true,
            },
        });
        res.status(200).json(students);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getStudents = getStudents;
const getStudentByGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getStudentByGroup = getStudentByGroup;
