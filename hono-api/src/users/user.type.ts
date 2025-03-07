export interface UserTypeT {
    id: number;
    firstName?: string;  // Optional instead of `null`
    lastName?: string;   // Optional instead of `null`
    email: string;
    role?: "user" | "admin"; // Avoid `null`
    auth?: {
      password: string;
    };
  } 
  