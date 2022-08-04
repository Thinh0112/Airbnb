import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Room from "../../components/Room/Room";
import { layDanhSachPhongAction } from "../../redux/actions/QuanLyPhongAction";

export default function Home(props) {
  const { arrRoom } = useSelector((state) => state.QuanLyPhongReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = layDanhSachPhongAction();
    dispatch(action);
  }, []);
  const renderRooms = () => {
    return arrRoom.map((room, index) => {
      return <Room key={index} room={room} />;
    });
  };
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {renderRooms()}
        </div>
      </div>
    </div>
  );
}
