import { Controller, Get, Param } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('rxjs')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get('repositories/:text')
  async repositories(@Param('text') text: string) {
    return await this.rxjsService.searchRepositories(text);
  }
}
