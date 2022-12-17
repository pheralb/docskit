export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// Database Interface =>
export interface Database {
  public: {
    Tables: {
      docs: {
        Row: {
          id?: number;
          user_id?: string;
          title?: string;
          description?: string;
          slug?: string;
          doc?: string;
          public?: boolean;
          created?: string;
        };
        Insert: {
          id?: number;
          user_id?: string;
          title: string;
          description?: string;
          slug: string;
          doc?: string;
          public?: boolean;
          created?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          title?: string;
          description?: string;
          slug?: string;
          doc?: string;
          public?: boolean;
          created?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
