import { ImageTransformation } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto as autoFormat } from "@cloudinary/base/qualifiers/format";
import { blur, grayscale } from "@cloudinary/base/actions/effect";

/*
{
    width: width,
    height: height,
    crop: "fill"
  },
  {
    effect: "blur:100",//
    quality: 1,//
    format: "auto"//
  },
  {
    effect: "grayscale"
  }
*/

function lqipTrans(width: number, height: number): ImageTransformation {
  return new ImageTransformation()
    .delivery(format(autoFormat()))
    .delivery(quality(1))
    .resize(fill().width(width).height(width))
    .effect(blur(100))
    .effect(grayscale());
}

export { lqipTrans };
