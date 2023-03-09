import { Cloudinary } from "@cloudinary/base";
import { lqipTrans } from "../cloudinary/transformations/lqip";
import { hqTrans } from "../cloudinary/transformations/hq";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Lazy Loading and LQIP</h1>
<h4>
  This is an example of implementing Lazy Loading, with low quality image placeholders (LQIP), using Cloudinary's JS SDK 2.0.
</h4>
`;

var width = 1000;
var height = 1000;

var images = [
  "string_1",
  "fat_cat",
  "bike",
  "lupine",
  "dog",
  "exif_sample",
  "sofa_cat"
];

function init() {
  var app = document.getElementById("app");
  const cld = new Cloudinary({
    cloud: {
      cloudName: "demo"
    }
  });

  // creating the image elements
  for (var i = 0; i < images.length; i++) {
    let imgLow = cld.image(`${images[i]}`);
    let imgHigh = cld.image(`${images[i]}`);
    imgLow.addTransformation(lqipTrans(width, height));
    imgHigh.addTransformation(hqTrans(width, height));

    let elem = document.createElement("img");
    elem.setAttribute("data-src", imgHigh.toURL());
    elem.setAttribute("class", "lazy");
    elem.src = imgLow.toURL();
    elem.width = width;
    elem.height = height;

    app.append(elem);
    app.append(document.createElement("br"));
  }

  let lazyImages = Array.from(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function () {
    if (active === false) {
      active = true;

      //setTimeout(function () {
      lazyImages.forEach(function (lazyImage) {
        if (
          lazyImage.getBoundingClientRect().top <= window.innerHeight &&
          lazyImage.getBoundingClientRect().bottom >= 0 &&
          getComputedStyle(lazyImage).display !== "none"
        ) {
          console.log(
            "load",
            lazyImage.getAttribute("data-src"),
            lazyImage.getBoundingClientRect().top,
            window.innerHeight,
            lazyImage.getBoundingClientRect().bottom
          );
          lazyImage.src = lazyImage.getAttribute("data-src");
          lazyImage.classList.remove("lazy");

          lazyImages = lazyImages.filter(function (image) {
            return image !== lazyImage;
          });

          if (lazyImages.length === 0) {
            document.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
            window.removeEventListener("orientationchange", lazyLoad);
          }
        }
      });

      active = false;
      //}, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
  lazyLoad();
}

init();
