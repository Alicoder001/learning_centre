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
exports.getGroups = exports.getGroup = exports.addGroup = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const utils_1 = require("../utils");
const addGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isActive, beginnedTime, dayPartId, weekPartId, teacherId, typeId, closeTime, roomId } = req.body;
        const hasGroup = yield prisma_1.default.group.findFirst({
            where: {
                weekPart: {
                    id: weekPartId,
                },
                dayPart: {
                    id: dayPartId,
                },
                room: {
                    id: roomId,
                },
            },
        });
        if (hasGroup) {
            return res.status(400).json({ error: 'Xona bu vaqtlarda band!' });
        }
        const group = yield prisma_1.default.group.create({
            data: {
                name,
                beginnedTime: beginnedTime || null,
                closeTime: closeTime || null,
                isActive,
                dayPart: {
                    connect: {
                        id: dayPartId,
                    },
                },
                weekPart: {
                    connect: {
                        id: weekPartId,
                    },
                },
                type: {
                    connect: {
                        id: typeId,
                    },
                },
                room: {
                    connect: {
                        id: roomId,
                    },
                },
            },
        });
        if (teacherId) {
            const hasTeacherId = yield prisma_1.default.teacher.findUnique({
                where: {
                    id: teacherId,
                },
            });
            console.log(teacherId);
            if (!hasTeacherId) {
                (0, utils_1.createLesson)();
                return res.status(200).json({
                    group,
                    message: 'Guruh yaratildi',
                    warning: "O'qituvchi guruhga biriktirilmadi!",
                });
            }
            yield prisma_1.default.groupTeacher.create({
                data: {
                    teacherId,
                    groupId: group.id,
                },
            });
        }
        if (!group) {
            return res.status(500).json({ error: 'Group yaratilmadi!' });
        }
        (0, utils_1.createLesson)();
        res.status(200).json({ message: 'Group yaratildi!' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.addGroup = addGroup;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.getGroup = getGroup;
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield prisma_1.default.group.findMany({
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
        res.status(200).json(groups);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getGroups = getGroups;
