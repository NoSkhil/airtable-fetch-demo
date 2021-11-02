import { createAsyncThunk } from "@reduxjs/toolkit";
import Airtable from "airtable";
import { ClassInfo, FormattedData, StudentDictionary } from "./types";

const base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('app8ZbcPx7dkpOnP0');

const getData = createAsyncThunk(
  "getData",
  async (name: string) => {
    let filter : string[] = [];
    let classInfo: ClassInfo[] = [];
    let studentFilter : string[] = [];
    let studentDictionary: StudentDictionary = {};
    let formattedData: FormattedData = {classInfo,studentDictionary};

  // Only fetching the data of the logged in student  - API CALL 1
    const currentStudentRecord = await base("Students").select({ filterByFormula: `{Name} = '${name}'` }).all();
    const studentRecord = currentStudentRecord[0];
    const classes = studentRecord.get("Classes") as string[];
        classes.map((classId) => {
          filter.push(`RECORD_ID()='${classId.toString()}'`);
        });
    const filterConstructor = filter.join();

  // Only fetching the data for the classes that the logged in student is part of. - API CALL 2
    const classRecords = await base("Classes").select({filterByFormula: `OR(${filterConstructor})`}).all();
    classRecords.map((classRecord) => {
      let classmates = classRecord.get("Students") as string[];
      let name = classRecord.get("Name") as string;
      classInfo.push({name,students:classmates});
      classmates.map(studentId=>{
        studentFilter.push(`RECORD_ID()='${studentId.toString()}'`);
      });
    });
    const studentFilterConstructor = studentFilter.join();

  // Only fetching the relevant student data (students in the classes of the logged in user). - API CALL 3
    const studentRecords = await base("Students").select({filterByFormula: `OR(${studentFilterConstructor})`}).all();
    studentRecords.map(studentInfo=>{
      let name = studentInfo.get("Name") as string;
      studentDictionary[`${studentInfo.id}`] = name;
    });

  /* Return the class information + student data 
     We are returning the student names in dictionary format so that we don't have to map the names of each student to each class individually.
     instead we directly reference the ID and pull the appropriate name from the dictionary.
  */
    formattedData['classInfo'] = classInfo;
    formattedData['studentDictionary'] = studentDictionary;
    return [formattedData];
  }
);

export {
  getData
};