const getImageHeight = (
  imgUrl: string,
  setImgHeight: (height: number) => void
) => {
  const img = new Image();
  img.src = imgUrl;

  img.onload = (ev) => {
    setImgHeight(img.height);
  };
};

export default getImageHeight;
