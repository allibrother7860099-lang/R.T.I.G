
export interface Student {
  id: string;
  name: string;
  course: string;
  dob: string;
  rollNumber: string;
  photo: string; // Base64 string
  enrollmentDate: string;
}

export enum AppView {
  SEARCH = 'SEARCH',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}
