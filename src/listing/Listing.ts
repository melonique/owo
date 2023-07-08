export type UserProfile = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  username: string;
}

export type Listing = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  tags?: string[];
  type?: string[];
  user_profile: UserProfile;
}