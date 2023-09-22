const getImageSize = (
  imgUrl: string,
  setImgHeight: (height: number) => void,
  setImgWidth: (width: number) => void
) => {
  const img = new Image();
  img.src = imgUrl;

  img.onload = (ev) => {
    setImgHeight(img.height);
    setImgWidth(img.width);
  };
};

export default getImageSize;
