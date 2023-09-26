"use client";

import { Circles } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className='w-full flex items-center justify-center mt-5'>
      <Circles
        height='40'
        width='40'
        color='#DAD4B5'
        ariaLabel='circles-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
};

export default PageLoader;
