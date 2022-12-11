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
          id: string;
          user_id: string;
          doc: string;
          public: boolean;
          created: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          doc: string;
          public?: boolean;
          created?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
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
