import { Injectable } from '@nestjs/common';
import { Client, isFullDatabase } from '@notionhq/client';
import { ConfigService } from '@nestjs/config';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// * For reference:
// https://github.com/makenotion/notion-sdk-js

@Injectable()
export class NotionService {
  private readonly notionClient: Client;

  constructor(configService: ConfigService) {
    this.notionClient = new Client({
      auth: configService.get<string>('NOTION_SECRET'), // Ensure you have a valid Notion token stored in your .env file
    });
    console.log('Notion client initialized');
  }

  async getDatabases(): Promise<DatabaseObjectResponse[]> {
    const results: DatabaseObjectResponse[] = [];
    const response = await this.notionClient.search({
      filter: { value: 'database', property: 'object' },
    });

    for (const result of response.results) {
      if (isFullDatabase(result)) {
        results.push(result);
      }
    }

    return results;
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
