"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = exports.Questions = exports.Exams = exports.Scorecards = exports.Users = void 0;
exports.Users = [
    {
        id: '1',
        roles: ['STUDENT', 'TEACHER'],
        fullName: 'Teacher Teacher',
        email: 'teacher@example.com',
        password: 'teacher',
    },
    {
        id: '2',
        roles: ['STUDENT', 'TEACHER', 'ADMIN'],
        fullName: 'Admin Admin',
        email: 'admin@example.com',
        password: 'admin',
    },
    {
        id: '3',
        roles: ['STUDENT'],
        fullName: 'User1 User',
        email: 'user1@example.com',
        password: 'user1',
    },
    {
        id: '4',
        roles: ['STUDENT'],
        fullName: 'User2 User',
        email: 'user2@example.com',
        password: 'user2',
    },
];
exports.Scorecards = [
    {
        user: '',
        exam: {},
        bonusScore: 1,
        status: 'Ready for review',
        totalScore: 9,
        notes: '',
        title: 'Scorecard #1',
        answers: [],
    },
];
exports.Exams = [
    {
        id: '1',
        title: 'Exam #1',
        questions: [],
    },
    {
        id: '2',
        title: 'Exam #2',
        questions: [],
    },
    {
        id: '3',
        title: 'Exam #3',
        questions: [],
    },
    {
        id: '3',
        title: 'Exam #4',
        questions: [],
    },
    {
        id: '3',
        title: 'Exam #5',
        questions: [],
    },
    {
        id: '3',
        title: 'Exam #6',
        questions: [],
    },
    {
        id: '3',
        title: 'Exam #7',
        questions: [],
    },
];
exports.Questions = [
    {
        id: '1',
        title: 'Question #1',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 3,
        category: '',
        exams: [],
    },
    {
        id: '2',
        title: 'Question #2',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 2,
        category: '',
        exams: [],
    },
    {
        id: '3',
        title: 'Question #3',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 4,
        category: '',
        exams: [],
    },
    {
        id: '4',
        title: 'Question #4',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 2,
        category: '',
        exams: [],
    },
    {
        id: '5',
        title: 'Question #5',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 2,
        category: '',
        exams: [],
    },
    {
        id: '6',
        title: 'Question #6',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 3,
        category: '',
        exams: [],
    },
    {
        id: '7',
        title: 'Question #7',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 3,
        category: '',
        exams: [],
    },
    {
        id: '8',
        title: 'Question #8',
        questionText: 'What would you like?',
        questionAnswer: '',
        maxScore: 2,
        category: '',
        exams: [],
    },
];
exports.Categories = [
    {
        title: 'Category #1',
        id: '1',
    },
    {
        title: 'Category #2',
        id: '2',
    },
    {
        title: 'Category #3',
        id: '3',
    },
];
//# sourceMappingURL=db-data.js.map