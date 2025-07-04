export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  resetToken: string;
  resetTokenExpiry: Date;
  avatar: string;
  articles: string[];
  paperclips: string[];
}
