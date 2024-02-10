export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_feedback: {
        Row: {
          call: string | null
          created_at: string
          feedback: string | null
          id: number
          input: string | null
          output: string | null
        }
        Insert: {
          call?: string | null
          created_at?: string
          feedback?: string | null
          id?: number
          input?: string | null
          output?: string | null
        }
        Update: {
          call?: string | null
          created_at?: string
          feedback?: string | null
          id?: number
          input?: string | null
          output?: string | null
        }
        Relationships: []
      }
      ai_pricing: {
        Row: {
          amount: number | null
          call: string | null
          created_at: string
          id: number
          model: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          call?: string | null
          created_at?: string
          id?: number
          model?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          call?: string | null
          created_at?: string
          id?: number
          model?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_pricing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      conversation: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      offer: {
        Row: {
          created_at: string
          deleted: boolean
          description: string
          embedding: string | null
          id: string
          images: string[]
          owner: string
          tags: string[] | null
          title: string | null
          type: string[]
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          description: string
          embedding?: string | null
          id?: string
          images?: string[]
          owner: string
          tags?: string[] | null
          title?: string | null
          type: string[]
        }
        Update: {
          created_at?: string
          deleted?: boolean
          description?: string
          embedding?: string | null
          id?: string
          images?: string[]
          owner?: string
          tags?: string[] | null
          title?: string | null
          type?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "offer_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      search_intents: {
        Row: {
          created_at: string
          embedding: string
          id: string
          query: string
          user_profile: string
        }
        Insert: {
          created_at?: string
          embedding: string
          id?: string
          query: string
          user_profile: string
        }
        Update: {
          created_at?: string
          embedding?: string
          id?: string
          query?: string
          user_profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_intents_user_profile_fkey"
            columns: ["user_profile"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_conversations: {
        Row: {
          conversation: string
          id: number
          joined_at: string
          user_profile: string
        }
        Insert: {
          conversation: string
          id?: number
          joined_at?: string
          user_profile: string
        }
        Update: {
          conversation?: string
          id?: number
          joined_at?: string
          user_profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_conversations_conversation_fkey"
            columns: ["conversation"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_conversations_conversation_fkey"
            columns: ["conversation"]
            isOneToOne: false
            referencedRelation: "conversation_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_conversations_user_profile_fkey"
            columns: ["user_profile"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_interests: {
        Row: {
          created_at: string | null
          id: string
          owner: string
          tags: string[]
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner: string
          tags?: string[]
        }
        Update: {
          created_at?: string | null
          id?: string
          owner?: string
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_messages: {
        Row: {
          conversation: string
          id: string
          message: string | null
          sender: string | null
          sent_at: string
          type: string
        }
        Insert: {
          conversation: string
          id?: string
          message?: string | null
          sender?: string | null
          sent_at?: string
          type?: string
        }
        Update: {
          conversation?: string
          id?: string
          message?: string | null
          sender?: string | null
          sent_at?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_messages_conversation_fkey"
            columns: ["conversation"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_conversation_fkey"
            columns: ["conversation"]
            isOneToOne: false
            referencedRelation: "conversation_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_messages_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_notifications: {
        Row: {
          context: Json
          created_at: string
          excerpt: string
          id: string
          status: string
          target: string
          type: string
        }
        Insert: {
          context?: Json
          created_at?: string
          excerpt: string
          id?: string
          status?: string
          target: string
          type?: string
        }
        Update: {
          context?: Json
          created_at?: string
          excerpt?: string
          id?: string
          status?: string
          target?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_target_fkey"
            columns: ["target"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profile: {
        Row: {
          created_at: string
          email: string
          firstname: string | null
          id: string
          name: string
          postalcode: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          firstname?: string | null
          id: string
          name: string
          postalcode?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          firstname?: string | null
          id?: string
          name?: string
          postalcode?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      conversation_metadata: {
        Row: {
          id: string | null
          last_updated: string | null
          title: string | null
          user_data: Json[] | null
          users: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      search_offers: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          created_at: string
          title: string
          description: string
          tags: string[]
          type: string[]
          images: string[]
          user_profile: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
