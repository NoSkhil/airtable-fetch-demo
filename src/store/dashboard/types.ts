export type Student = {
  id: string;
  name: string;
}

export type ClassInfo = {
  name: string;
  students: string[];
}

export type StudentDictionary = {
  [index: string]: String
}

export type FormattedData = {
  classInfo: ClassInfo[];
  studentDictionary: StudentDictionary;
}

export type DashboardState = {
  status: number;
  classInfos: ClassInfo[];
  studentDictionary: StudentDictionary;
}