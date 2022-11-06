import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return 'im signin';
  }
  signup() {
    return 'im signup';
  }
}
