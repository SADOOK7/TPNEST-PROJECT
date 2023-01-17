"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
let CourseService = class CourseService {
    constructor(courseRepository, userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }
    async addCourse(authorId, createCourseDto) {
        const author = await this.userRepository.findOne({ where: {
                id: authorId
            } });
        if (!author) {
            throw new common_1.ForbiddenException('No author with such id');
        }
        delete author.password;
        const course = await this.courseRepository.save(Object.assign(Object.assign({}, createCourseDto), { author }));
        return course;
    }
    async findAllCourses() {
        return await this.courseRepository.find({ relations: ['Comments'] });
    }
    async findByName(name) {
        return await this.courseRepository.findOne({ where: {
                name
            } });
    }
    async findByAuthor(authorId) {
        const author = await this.userRepository.findOne({ where: {
                id: authorId
            } });
        if (!author) {
            throw new common_1.ForbiddenException('no user with such id!');
        }
        let courses = [];
        courses = await this.courseRepository.find({ where: {
                author
            } });
        return courses;
    }
    async updateCourse(id, currentUserId, updateCourseDto) {
        const course = await this.courseRepository.findOne({ where: {
                id
            } });
        if (!course) {
            throw new common_1.ForbiddenException('No course with such id!');
        }
        if (course.author.id != currentUserId) {
            console.log(course.author.id);
            throw new common_1.ForbiddenException('you are not the owner of the course');
        }
        return await this.courseRepository.update(id, updateCourseDto);
    }
    async deleteCourse(id, currentUserId) {
        const course = await this.courseRepository.findOne({ where: {
                id
            } });
        if (!course) {
            throw new common_1.ForbiddenException('No course with such id!');
        }
        if (course.author.id != currentUserId) {
            throw new common_1.ForbiddenException('you are not the owner of the course');
        }
        const deletedUser = await this.courseRepository.delete(id);
        return 'Course Deleted Successfully';
    }
    async buyCourse(userId, courseName) {
        const course = await this.findByName(courseName);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['Buyed']
        });
        user.Buyed.push(course);
        course.buyersCount++;
        await this.userRepository.save(user);
        await this.courseRepository.save(course);
        return course;
    }
    async addCourseToFavorites(userId, courseName) {
        const course = await this.findByName(courseName);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });
        const isNotFavorited = user.favorites.findIndex((courseInFavorites) => courseInFavorites.id === course.id) === -1;
        if (isNotFavorited) {
            user.favorites.push(course);
            course.rate++;
            await this.userRepository.save(user);
            await this.courseRepository.save(course);
        }
        return course;
    }
    async deleteCourseFromFavorites(userId, courseName) {
        const course = await this.findByName(courseName);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['favorites']
        });
        const courseIndex = user.favorites.findIndex((courseInFavorites) => courseInFavorites.id === course.id);
        if (courseIndex >= 0) {
            user.favorites.splice(courseIndex, 1);
            course.rate--;
            await this.userRepository.save(user);
            await this.courseRepository.save(course);
        }
        return course;
    }
    async commentCourse(userId, courseName, comment) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const course = await this.courseRepository.findOne({
            where: { name: courseName },
            relations: ['Comments']
        });
        course.Comments.push({
            body: comment,
            author: user
        });
        await this.courseRepository.save(course);
        return course;
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map