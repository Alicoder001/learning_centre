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
exports.everyMinutes = exports.everyHour = exports.createLesson = void 0;
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("./db/prisma"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const currentTime = () => {
    const currentMin = new Date().getMinutes();
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDate();
    const weekDay = new Date().getDay();
    const fullTime = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
    const ymd = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
    return { currentMin, currentHour, currentDay, weekDay, fullTime, ymd };
};
const getCurrentGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield prisma_1.default.group.findMany({
        where: {
            isActive: true,
        },
        include: { weekPart: true, dayPart: true },
    });
    const filterGroup = groups.filter((item) => { var _a; return (_a = item.weekPart) === null || _a === void 0 ? void 0 : _a.part.split('-').includes(currentTime().weekDay.toString()); });
    return filterGroup;
});
const vaqtZonasi = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timeZoneFormatter = (time) => {
    return (0, date_fns_1.addHours)(new Date(time), 5);
};
const createLesson = () => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield getCurrentGroup();
    groups.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const hasLesson = yield prisma_1.default.lesson.findFirst({
                where: {
                    day: currentTime().currentDay,
                    groupId: item.id,
                },
            });
            if (!hasLesson) {
                yield prisma_1.default.lesson.create({
                    data: {
                        name: '',
                        group: {
                            connect: {
                                id: item.id,
                            },
                        },
                        day: currentTime().currentDay,
                        startedTime: timeZoneFormatter(`${currentTime().ymd} ${(_a = item.dayPart) === null || _a === void 0 ? void 0 : _a.part}:00.000`),
                    },
                });
            }
        }
        catch (error) { }
    }));
});
exports.createLesson = createLesson;
const checkerTime = (time) => {
    const vaqt = timeZoneFormatter(`2023-10-07 10:00:00.000`);
    const hozirgi = timeZoneFormatter(`${time}`);
    return vaqt > hozirgi;
};
exports.everyHour = node_schedule_1.default.scheduleJob('0 0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.createLesson)();
}));
const checkLesson = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessons = yield prisma_1.default.lesson.findMany({
            where: {
                day: new Date().getDate(),
                isAttandance: false,
            },
        });
        console.log(lessons);
        lessons.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
            const dif = checkerTime(item.startedTime);
            console.log(dif);
            if (!dif) {
                yield prisma_1.default.lesson.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        isNotDone: true,
                    },
                });
            }
        }));
    }
    catch (error) { }
});
exports.everyMinutes = node_schedule_1.default.scheduleJob('* 1 * * * *', () => {
    checkLesson();
});
