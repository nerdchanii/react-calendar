import React from "react";

type Props = {};

const TodoCreatedAlert = (props: Props) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
      할 일이 추가되었습니다.
    </div>
  );
};

export default TodoCreatedAlert;
