export interface PersonalInfoPayload {
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
}

export interface PasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
