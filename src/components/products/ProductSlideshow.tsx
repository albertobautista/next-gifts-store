import React, { FC } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import styles from "./ProductSlideshow.module.css";
interface Props {
  images: string[];
  isDetail?: boolean;
}
export const ProductSlideshow: FC<Props> = ({ images, isDetail = false }) => {
  return (
    <Slide
      easing="ease"
      duration={5000}
      autoplay={isDetail ? true : false}
      indicators
    >
      {images.map((image) => {
        return (
          <div
            className={
              isDetail ? styles["each-slide-detail"] : styles["each-slide"]
            }
            key={image}
          >
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
