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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../db/prisma"));
const totalInfoRouter = express_1.default.Router();
totalInfoRouter.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        console.log(token);
        const response = yield prisma_1.default.totalInfo.findMany({
            include: {
                controlType: true,
            },
        });
        const types = yield prisma_1.default.centerType.findMany({
            select: {
                id: true,
                name: true,
                title: true,
                description: true,
                info: true,
                link: false,
            },
        });
        const total = response[0];
        const { controlType } = total, rest = __rest(total, ["controlType"]);
        const studentCount = yield prisma_1.default.student.count({});
        const teacherCount = yield prisma_1.default.teacher.count({});
        const groups = yield prisma_1.default.group.findMany({});
        const teachers = yield prisma_1.default.group.findMany({});
        const groupType = yield prisma_1.default.groupType.findMany({});
        const dayPart = yield prisma_1.default.dayPart.findMany({});
        const teacherName = yield prisma_1.default.teacher.findMany({});
        const weekPart = yield prisma_1.default.weekPart.findMany({});
        const rooms = yield prisma_1.default.room.findMany({});
        const lessons = yield prisma_1.default.lesson.findMany({
            where: {
                day: new Date().getDate(),
                isAttandance: false,
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
        res.status(200).json(Object.assign(Object.assign({}, rest), { link: (controlType === null || controlType === void 0 ? void 0 : controlType.link) ? controlType.link : '', controlType: (controlType === null || controlType === void 0 ? void 0 : controlType.name) ? controlType.name : null, studentCount,
            teacherCount,
            lessons,
            rooms,
            teachers,
            token,
            groups,
            types,
            dayPart,
            teacherName,
            weekPart,
            groupType }));
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
}));
totalInfoRouter.patch('/update/id/:infoId/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const infoId = +req.params.infoId;
        const { typeId } = req.body;
        const type = yield prisma_1.default.centerType.findUnique({
            where: {
                id: typeId,
            },
        });
        if (!type) {
            return res.status(404).json({ error: 'Bunday type mavjud emas' });
        }
        const info = yield prisma_1.default.totalInfo.findUnique({
            where: {
                id: infoId,
            },
        });
        if (!info) {
            return res.status(404).json({ error: 'Bunday infoId mavjud emas!' });
        }
        const updateInfo = yield prisma_1.default.totalInfo.update({
            where: {
                id: infoId,
            },
            data: {
                typeId,
            },
            include: {
                controlType: true,
            },
        });
        res.status(200).json({ controlType: ((_b = updateInfo === null || updateInfo === void 0 ? void 0 : updateInfo.controlType) === null || _b === void 0 ? void 0 : _b.name) ? updateInfo.controlType.name : null, message: "Ma'lumot yangilandi!" });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
}));
exports.default = totalInfoRouter;
// totalInfoRouter.post('get', async (req, res) => {
// 	try {
// 		const { name } = req.body;
// 		const response = await prisma.totalInfo.create({
// 			data: {
// 				name,
// 			},
// 		});
// 		res.status(200).json({ data: response });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
// 	}
// });
