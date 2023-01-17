"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const typeorm_1 = require("@nestjs/typeorm");
const course_entity_1 = require("./entities/course.entity");
const jwt_1 = require("@nestjs/jwt");
const jwt_startegy_1 = require("../user/startegy/jwt.startegy");
const user_entity_1 = require("../user/entities/user.entity");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course, user_entity_1.User]), jwt_1.JwtModule.register({})],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService, jwt_startegy_1.JWTStrategy]
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map