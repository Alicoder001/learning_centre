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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return res.status(500).json({ error: 'Serverda xatolik!' });
        }
        const validToken = jsonwebtoken_1.default.verify(token, 'secret');
        if (!validToken) {
            return res.status(401).json({ error: 'token xato' });
        }
        const id = validToken.adminId;
        const admin = yield prisma_1.default.admin.findUnique({
            where: {
                id,
            },
        });
        if (!admin) {
            return res.status(404).json({ error: 'Autentifikatsiya amalga oshirilmadi!' });
        }
        req.adminId = admin.id;
        next();
    }
    catch (error) {
        res.status(500).json('Serverda xatolik yuz berdi!');
    }
});
exports.default = adminAuth;
