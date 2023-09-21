"use client";

import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={20}
      width={20}
      color='#f1f1f1'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='#f1f1f1'
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
