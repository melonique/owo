export type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  username: string;
}

export type Listing = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  tags?: string[];
  type?: string[];
  userProfile: UserProfile;
  images: string[];
}
