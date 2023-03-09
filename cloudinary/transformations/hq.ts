import { ImageTransformation } from "@cloudinary/base";
import { fill } from "@cloudinary/base/actions/resize";
import { format, quality } from "@cloudinary/base/actions/delivery";
import { auto as autoFormat } from "@cloudinary/base/qualifiers/format";
import { auto as autuQuality } from "@cloudinary/base/qualifiers/quality";

/*
[
  {
    width: width,
    height: height,
    crop: "fill"
  },
  {
    format: "auto",
    quality: "auto"
  }
];
*/

function hqTrans(width: number, height: number): ImageTransformation {
  return new ImageTransformation()
    .delivery(format(autoFormat()))
    .delivery(quality(autuQuality()))
    .resize(fill().width(width).height(height));
}

export { hqTrans };
