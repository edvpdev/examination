"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scorecard_schema_1 = require("./src/schemas/scorecard.schema");
const category_schema_1 = require("./src/schemas/category.schema");
const question_schema_1 = require("./src/schemas/question.schema");
const exam_schema_1 = require("./src/schemas/exam.schema");
const user_schema_1 = require("./src/schemas/user.schema");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const db_data_1 = require("./db-data");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://demo1234:belekas123@demo.wizjc.mongodb.net/examination-app?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};
const getRandomInt = (num) => Math.floor(Math.random() * num);
const importData = async () => {
    try {
        const ExamModel = mongoose.model('Exams', exam_schema_1.ExamSchema);
        const QuestionModel = mongoose.model('Questions', question_schema_1.QuestionSchema);
        const CategoryModel = mongoose.model('Categories', category_schema_1.CategorySchema);
        const ScorecardModel = mongoose.model('Scorecards', scorecard_schema_1.ScorecardSchema);
        const UserModel = mongoose.model('Users', user_schema_1.UserSchema);
        await QuestionModel.deleteMany();
        await ExamModel.deleteMany();
        await CategoryModel.deleteMany();
        await ScorecardModel.deleteMany();
        await UserModel.deleteMany();
        const createdCategories = await CategoryModel.insertMany(db_data_1.Categories);
        const createdQuestions = db_data_1.Questions.map((cQuestion) => {
            return Object.assign(Object.assign({}, cQuestion), { category: createdCategories[getRandomInt(createdCategories.length)] });
        });
        await QuestionModel.insertMany(createdQuestions);
        const newQuestions = await QuestionModel.find({});
        const updatedExams = db_data_1.Exams.map((exam) => {
            let questions = [
                newQuestions[getRandomInt(newQuestions.length)],
                newQuestions[getRandomInt(newQuestions.length)],
                newQuestions[getRandomInt(newQuestions.length)],
            ];
            questions = [...new Set(questions)];
            exam.questions = questions;
            return exam;
        });
        await ExamModel.insertMany(updatedExams);
        const newExams = await ExamModel.find({}).populate('questions').exec();
        console.log(newQuestions);
        let updatedQuestions = newQuestions.map(async (question) => {
            let exams = [
                newExams[getRandomInt(newExams.length)],
                newExams[getRandomInt(newExams.length)],
                newExams[getRandomInt(newExams.length)],
            ];
            console.log(exams);
            exams = [...new Set(exams)];
            question.exams = exams;
            console.log(question);
            await question.save();
            return question;
        });
        updatedQuestions = await Promise.all([...updatedQuestions]);
        const updatedUsers = db_data_1.Users.map((user) => {
            const salt = bcryptjs.genSaltSync(10);
            const hash = bcryptjs.hashSync(user.password, salt);
            user.password = hash;
            return user;
        });
        await UserModel.insertMany(updatedUsers);
        const createdUsers = await UserModel.find({});
        const scorecards = db_data_1.Scorecards.map((scorecard) => {
            const exam = newExams[getRandomInt(newExams.length)];
            const user = createdUsers[getRandomInt(createdUsers.length)].fullName;
            const answers = exam.questions.map((question) => {
                const { title, questionText, maxScore, category } = question;
                return {
                    title,
                    questionText,
                    questionAnswer: '',
                    maxScore,
                    category,
                    givenScore: maxScore,
                };
            });
            return {
                answers: answers,
                exam: exam,
                user: user,
                status: 'Ready for review',
                bonusScore: 0,
                totalScore: 0,
                title: `${exam.title} - ${user}`,
                notes: '',
            };
        });
        await ScorecardModel.insertMany(scorecards);
        const finalScorecards = await ScorecardModel.find({});
        console.log('Data Imported!');
        process.exit();
    }
    catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};
connectDB();
importData();
//# sourceMappingURL=db-seeder.js.map