import React from 'react'
import { ClassInfo, StudentDictionary } from '../../store/dashboard/types';

export type Props = {
  data: ClassInfo,
  studentDictionary: StudentDictionary
}

const Card: React.FC<Props> = ({ data, studentDictionary }) => {
  return (
    <div className="my-2 p-3 space-y-3 border border-gray-400 rounded-md flex flex-wrap w-80">
      <span className="font-bold w-full">Name</span>
      <span className="font-semibold w-full">{data.name}</span>
      <span className="font-bold w-full">Students</span>
      {data.students.map(student=>{
        return <span className="font-semibold w-full">- {studentDictionary[student]}</span>
      })}
    </div>
  )
};

export default Card;
