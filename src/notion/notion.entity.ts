export interface NotionDatabase {
  object: string;
  id: string;
  cover?: any; // Assuming it could be null
  icon?: any; // Assuming it could be null
  created_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  last_edited_time: string;
  title: Array<{
    type: string;
    text: {
      content: string;
      link?: any; // Assuming it could be null
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: any; // Assuming it could be null
  }>;
  description: any[]; // Assuming it could be empty or null
  is_inline: boolean;
  properties: {
    Tags: {
      id: string;
      name: string;
      type: string;
      multi_select: {
        options: any[];
      };
    };
    Name: {
      id: string;
      name: string;
      type: string;
      title: {};
    };
  };
  parent: {
    type: string;
    page_id: string;
  };
  url: string;
  public_url?: any; // Assuming it could be null
  archived: boolean;
  in_trash: boolean;
}
