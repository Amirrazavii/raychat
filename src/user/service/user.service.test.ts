import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Queue } from 'bull';
import { CreateUserDto } from '../dto/index';
import { User } from '../schema/user.schema';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    describe('login', () => {
        it('should return a user object if login is successful', async () => {
            // Arrange
            const userDto: CreateUserDto = {
                username: 'amir',
                password: 'password',
            };

            // Act
            const result = await service.login(userDto);

            // Assert
            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('email', userDto.username);
        });

        it('should throw an UnauthorizedException if login fails', async () => {
            // Arrange
            const userDto: CreateUserDto = {
                username: 'amir',
                password: 'incorrectPassword',
            };

            // Act & Assert
            await expect(service.login(userDto)).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('register', () => {
        it('should create a new user and return the created user object', async () => {
            // Arrange
            const userDto: CreateUserDto = {
                username: 'test@example.com',
                password: 'password',
            };

            // Act
            const result = await service.create(userDto);

            // Assert
            expect(result).toBeDefined();
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('email', userDto.username);
        });
    });
});