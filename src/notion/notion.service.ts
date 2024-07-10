import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotionService {
  private readonly notionClient: Client;

  constructor(configService: ConfigService) {
    this.notionClient = new Client({
      auth: configService.get<string>('NOTION_SECRET'), // Ensure you have a valid Notion token stored in your .env file
    });
    console.log('Notion client initialized');
  }

  async getDatabases(): Promise<any[]> {
    // console.log(this.configService.get<string>('NOTION_SECRET'));
    const response = await this.notionClient.search({
      filter: { value: 'database', property: 'object' },
    });
    console.log(response);
    return response.results || [];
  }

  async createNewPage(databaseId: string, pageName: string): Promise<void> {
    const response = await this.notionClient.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: pageName,
              },
            },
          ],
        },
      },
    });

    console.log(`Created new page with ID: ${response.id}`);
  }
}
