// //auth.controller.ts

// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'; // Update the path
// import { LoginDto } from '../../../../dto/src/lib/login.dto'; // Update the path
// import { AuthService } from 'path/to/auth.service'; // Update the path

// @Controller('auth')
// export class AuthController {
//     constructor(private readonly authService: AuthService) {}

//     @Post('login')
//     @HttpCode(HttpStatus.OK)
//     async login(@Body() loginDto: LoginDto): Promise<any> {
//         const result = await this.authService.login(loginDto);
//         return { token: result.access_token }; // Example: Return a token upon successful login
//     }
// }
