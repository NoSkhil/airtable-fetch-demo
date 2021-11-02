import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card';
import { STATUSES } from '../../constants/redux';
import { setLogin } from '../../store/auth';
import { selectDashboardData, selectDashboardStatus, selectStudentDictionary } from '../../store/dashboard/selectors';
import { ClassInfo } from '../../store/dashboard/types';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const classesData = useSelector(selectDashboardData);
  const isPending = useSelector(selectDashboardStatus) === STATUSES.PENDING;
  const isRejected = useSelector(selectDashboardStatus) === STATUSES.REJECTED;
  const studentDictionary = useSelector(selectStudentDictionary);
  const logOut = () => {
    dispatch(setLogin(false));
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      {
        isPending ? (
          <div className="font-semibold">Loading...</div>
        ) :  isRejected ? (
            <div>
              <div className="absolute top-5 right-5">
                <button type="button" className="py-1 px-3 border rounded-md text-sm font-medium focus:outline-none bg-gray-300 mx-auto" onClick={logOut}>
                  <span className="font-semibold">Return</span>
                </button>
              </div>
              <div className="font-semibold">Invalid User</div>
            </div>
        ) : (
          <>
            <div className="absolute top-5 right-5">
              <button type="button" className="py-1 px-3 border rounded-md text-sm font-medium focus:outline-none bg-gray-300 mx-auto" onClick={logOut}>
                <span className="font-semibold">Logout</span>
              </button>
            </div>
            <div>
              {
                classesData.map((classData: ClassInfo, index: number) => (<Card key={index} data={classData} studentDictionary={studentDictionary}/>))
              }
            </div>
          </>
        )
      }      
    </div>
  )
};

export default MainPage;
