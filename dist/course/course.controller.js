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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
let CourseController = class CourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    create(createCourseDto, req) {
        return this.courseService.addCourse(req.user.userId, createCourseDto);
    }
    findAll() {
        return this.courseService.findAllCourses();
    }
    findByName(name) {
        return this.courseService.findByName(name);
    }
    findByAuthor(authorId) {
        return this.courseService.findByAuthor(+authorId);
    }
    update(id, updateCourseDto, req) {
        return this.courseService.updateCourse(+id, req.user.userId, updateCourseDto);
    }
    remove(id, req) {
        return this.courseService.deleteCourse(+id, req.user.userId);
    }
    likeCourse(name, req) {
        return this.courseService.addCourseToFavorites(req.user.userId, name);
    }
    dislikeCourse(name, req) {
        return this.courseService.deleteCourseFromFavorites(req.user.userId, name);
    }
    buyCourse(name, req) {
        return this.courseService.buyCourse(req.user.userId, name);
    }
    commentCourse(name, comment, req) {
        return this.courseService.commentCourse(req.user.userId, name, comment);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('addcourse'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('allcourses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('coursebyname/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findByName", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('coursebyauthor/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findByAuthor", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('updatecourse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)('deletecourse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('likecourse/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "likeCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('dislikecourse/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "dislikeCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('buycourse/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "buyCourse", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('commentcourse/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "commentCourse", null);
CourseController = __decorate([
    (0, common_1.Controller)('course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map