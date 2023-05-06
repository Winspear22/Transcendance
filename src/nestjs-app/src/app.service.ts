import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'popololo!';
  }
}

@Injectable()
export class AppService2
{
  getHello2(): string
  {
    return 'salut je suis gethello2';
  }
}