export interface UserResponse {
  roles:    string[];
  fullName: string;
  id:       string;
  isActive: boolean;
  email:    string;
}

export interface AuthResponse {
  user:  UserResponse;
  token: string;
}
