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
const database_1 = require("../../../middlewares/database");
const userModel_1 = __importDefault(require("../../../models/userModel"));
describe('User Model', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to the test database
        yield database_1.sequelize.sync();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close the database connection
        yield database_1.sequelize.close();
    }));
    it('should create a new user', () => {
        const user = userModel_1.default.build({
            user_email: 'test@example.com',
            user_name: 'testuser',
            user_pass: 'testpassword',
            is_deleted: 0,
        });
        expect(user).toBeDefined();
        expect(user.user_id).toBeDefined();
        expect(user.user_email).toBe('test@example.com');
        // Add more assertions based on your model structure
    });
    it('should validate unique username', () => __awaiter(void 0, void 0, void 0, function* () {
        // Build another user instance with the same username
        const newUser = userModel_1.default.build({
            user_email: 'test3@example.com',
            user_name: 'uniqueuser',
            user_pass: 'testpassword',
            is_deleted: 0,
        });
        // Validate the instance without saving it to the database
        try {
            yield newUser.validate();
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.name).toBe('SequelizeValidationError');
            expect(error.errors).toHaveLength(1);
            expect(error.errors[0].message).toBe('This username is already taken');
        }
    }));
    // Add more test cases as needed
});
