export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  isActive: boolean;
  name?: string; // Optional for backward compatibility or computed property
  roles?: string[]; // Optional for backward compatibility
}
