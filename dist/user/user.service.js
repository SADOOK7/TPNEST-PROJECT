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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, config, jwt) {
        this.userRepository = userRepository;
        this.config = config;
        this.jwt = jwt;
    }
    async signToken(userId, email) {
        const secret = this.config.get('secret');
        const payload = {
            sub: userId,
            email: email
        };
        return this.jwt.signAsync(payload, {
            secret: secret
        });
    }
    async createUser(createUserDto) {
        const user = await this.userRepository.findOne({ where: {
                email: createUserDto.email,
            } });
        if (user) {
            throw new common_1.ForbiddenException('this email is already in use');
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const newUser = await this.userRepository.save(createUserDto);
        delete newUser.password;
        const token = this.signToken(newUser.id, newUser.email);
        return newUser;
    }
    async findAllUsers() {
        return await this.userRepository.find({ relations: ['Buyed', 'favorites'] });
    }
    async findUserByEmail(loginDto) {
        const user = await this.userRepository.findOne({ where: {
                email: loginDto.email,
            } });
        if (!user) {
            throw new common_1.ForbiddenException('Wrong email or password!');
        }
        const correctPassword = await bcrypt.compare(loginDto.password, user.password);
        if (!correctPassword) {
            throw new common_1.ForbiddenException('Wrong email or password!');
        }
        delete user.password;
        const token = this.signToken(user.id, user.email);
        return user;
    }
    async findUserById(userId) {
        const user = await this.userRepository.findOne({ where: {
                id: userId,
            } });
        if (!user) {
            throw new common_1.ForbiddenException('No user with such id');
        }
        delete user.password;
        return user;
    }
    async updateUser(userId, updateUserDto) {
        const user = await this.userRepository.findOne({ where: {
                id: userId,
            } });
        if (!user) {
            throw new common_1.ForbiddenException('No user with such id');
        }
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        return await this.userRepository.update(userId, updateUserDto);
    }
    async deleteUser(userId, loginDto) {
        const user = await this.userRepository.findOne({ where: {
                email: loginDto.email,
            } });
        if (!user) {
            throw new common_1.ForbiddenException('Wrong email or password!');
        }
        const correctPassword = await bcrypt.compare(loginDto.password, user.password);
        if (!correctPassword) {
            throw new common_1.ForbiddenException('Wrong email or password!');
        }
        const deletedUser = await this.userRepository.delete(userId);
        return 'User Deleted Successfully';
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map