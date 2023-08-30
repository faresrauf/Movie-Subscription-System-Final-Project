/*eslint-disable*/
import { Controller, Get, Inject} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

  @Get()
  async getHello() {
  }
}
