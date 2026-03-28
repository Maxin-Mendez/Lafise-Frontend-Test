export interface UserProduct {
  type: string;
  id: string;
}

export interface User {
  full_name: string;
  profile_photo: string;
  products: UserProduct[];
}
