import { ScorecardSchema } from './src/schemas/scorecard.schema';
import { CategorySchema } from './src/schemas/category.schema';
import { QuestionSchema } from './src/schemas/question.schema';
import { Category } from './src/interfaces/category';
import { IQuestion, IQuestionDoc } from './src/interfaces/question';
import { User } from './src/interfaces/user';
import { Exam } from './src/interfaces/exam';
import { Scorecard } from './src/interfaces/scorecard';
import { ExamSchema } from './src/schemas/exam.schema';
import { UserSchema } from './src/schemas/user.schema';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { Exams, Questions, Categories, Scorecards, Users } from './db-data';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://demo1234:belekas123@demo.wizjc.mongodb.net/examination-app?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getRandomInt = (num: number): number => Math.floor(Math.random() * num);

const importData = async () => {
  try {
    const ExamModel: Model<Exam> = mongoose.model('Exams', ExamSchema);
    const QuestionModel: Model<IQuestionDoc> = mongoose.model(
      'Questions',
      QuestionSchema,
    );
    const CategoryModel: Model<Category> = mongoose.model(
      'Categories',
      CategorySchema,
    );
    const ScorecardModel: Model<Scorecard> = mongoose.model(
      'Scorecards',
      ScorecardSchema,
    );
    const UserModel: Model<User> = mongoose.model('Users', UserSchema);

    await QuestionModel.deleteMany();
    await ExamModel.deleteMany();
    await CategoryModel.deleteMany();
    await ScorecardModel.deleteMany();
    await UserModel.deleteMany();

    // INSERT CATEGORIES
    const createdCategories = await CategoryModel.insertMany(Categories);

    // INSERT QUESTIONS
    const createdQuestions = Questions.map((cQuestion) => {
      return {
        ...cQuestion,
        category: createdCategories[getRandomInt(createdCategories.length)],
      };
    });
    await QuestionModel.insertMany(createdQuestions);
    const newQuestions = await QuestionModel.find({});

    // INSERT EXAMS
    const updatedExams = Exams.map((exam: Exam) => {
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
    // console.log(createdExams);
    // UPDATE EXAMS WITH RANDOM QUESTIONS
    //console.log(createdExams);
    console.log(newQuestions);
    // UPDATE QUESTIONS WITH RANDOM EXAMS
    let updatedQuestions = newQuestions.map(async (question: IQuestionDoc) => {
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

    //INSERT USERS
    const updatedUsers = Users.map((user) => {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(user.password, salt);
      user.password = hash;
      return user;
    });
    await UserModel.insertMany(updatedUsers);
    const createdUsers = await UserModel.find({});

    // INSERT SCORECARDS
    const scorecards = Scorecards.map((scorecard) => {
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
    console.log(finalScorecards);
    if (createdCategories && updatedQuestions && finalScorecards & newExams) {
      console.log('Data Imported!');
      process.exit();
    }
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

connectDB();
importData();
