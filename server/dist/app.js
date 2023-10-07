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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const v_admin_routes_1 = __importDefault(require("./routes/admin_control/v_admin.routes"));
const v_teacher_routes_1 = __importDefault(require("./routes/teacher_control/v_teacher.routes"));
const v_hybrid_routes_1 = __importDefault(require("./routes/hybrid_control/v_hybrid.routes"));
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma_1 = __importDefault(require("./db/prisma"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use('/api/v_admin', v_admin_routes_1.default);
app.use('/api/v_teacher', v_teacher_routes_1.default);
app.use('/api/v_hybrid', v_hybrid_routes_1.default);
app.use('/api/student', routes_1.studentRouter);
app.use('/api/info', routes_1.totalInfoROuter);
app.post('/api/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if ((admin === null || admin === void 0 ? void 0 : admin.type.name) !== 'super') {
            return res.status(404).json({ error: 'Siz super admin emassiz!' });
        }
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
}));
app.use('/api/admin', routes_1.adminRouter);
// app.use('/api/centerType')
exports.default = app;
