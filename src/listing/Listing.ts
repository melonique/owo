export type Listing = {
  id: string;
  owner: string;
  created_at: string;
  title: string;
  description: string;
  tags?: string[];
  type?: string[];
}