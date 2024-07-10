import { Controller, Get } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get('databases')
  async getDatabases() {
    try {
      const databases = await this.notionService.getDatabases();
      console.log(databases);
      return databases;
    } catch (error) {
      console.error('Failed to fetch databases:', error);
      throw error; // Or handle the error appropriately
    }
  }
}
