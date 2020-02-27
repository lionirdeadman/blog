if (process.env.NODE_ENV == 'production')
{
  process.exit(0);
}

const JsDOM = require("jsdom");
const Glob = require("fast-glob");
const Path = require("path");
const FS = require("fs").promises;
const getImageSize = require('image-size');
const Jimp = require('jimp');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const Util = require('./deps/util');

const sourcePath = Path.resolve(__dirname, "../_site/");
const sourceHTMLGlob = Path.join(sourcePath, "/**/*.html");
const sourceHTMLFiles = Glob.sync(sourceHTMLGlob);

const imageSizes = [
  {
    width: 200, suffix: '2x'
  },
  {
    width: 400, suffix: '4x'
  },
  {
    width: 600, suffix: '6x'
  },
  {
    width: 700, suffix: '7x'
  }
]

const imageFolder = Path.join(sourcePath, '/assets/images/');
const compressInputImageGlob = Path.join(imageFolder, '/**/*.{jpeg,jpg,png}');

const skipAttribute = 'data-no-transform';

function getAttributesAsObject (attributesMap, encode = i => i)
{
  const collection = {};

  for (const attribute of attributesMap)
  {
    collection[attribute.name] = encode(attribute.value);
  }

  return collection;
}

/** @param document {Document} * @param image {HTMLElement} */
function createFastImage (document, image, dimensions = {})
{
  const scriptElement = document.createElement('script');

  const fallbackElement = document.createElement('noscript');
  const newImage = image.cloneNode(true);

  // Provide a fallback for the fallback for evergreen browsers that support this.
  newImage.setAttribute('loading', 'lazy');
  fallbackElement.appendChild(newImage);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(scriptElement);
  fragment.appendChild(fallbackElement);
  const value = {
    fragment,
    scriptElement,
    fallbackElement,
    newImage,
    setAttributes: (dimensions = {}) =>
    {
      for (const [key, value] of Object.entries(dimensions))
      {
        newImage.setAttribute(key, value);
      }

      scriptElement.innerHTML = `i_(${JSON.stringify({ ...getAttributesAsObject(image.attributes), ...dimensions })})`;
    }
  };

  if (dimensions) {
    value.setAttributes(dimensions);
  }

  return value;
}

async function changeImageSizes ()
{
  await imagemin([compressInputImageGlob], {
    destination: imageFolder,
    plugins: [
        imageminJpegtran({
          quality: [0.6, 0.8]
        }),
        imageminPngquant({
            quality: [0.6, 0.8]
        })
    ]
});
}

(async function transformImages () {
  const promises = [];
  for (const sourceHTMLFile of sourceHTMLFiles)
  {
    const fullPath = Path.resolve(sourceHTMLGlob, sourceHTMLFile);
    const content = await FS.readFile(fullPath, "utf8");
    const { window } = new JsDOM.JSDOM(content);
    const { document } = window;
    const images = document.querySelectorAll('img');

    for (const image of images)
    {
      const isFromAssets = image.src.startsWith('/assets/images/');

      if (isFromAssets && image.src.endsWith('.svg')) {
        console.log('Inline SVG', {
          src: image.src
        });

        const fullImageSrcPath = Path.join(
          Path.resolve(__dirname, '../_site/'),
          image.src
        );

        const stats = await FS.stat(fullImageSrcPath);

        // If the size of the file is under a Megabyte...
        if (stats.size < 1000000) {
          const content = await FS.readFile(fullImageSrcPath);
          const stubElement = document.createElement('div');
          // Parse the HTML of the SVG.
          stubElement.innerHTML = content;

          image.replaceWith(
            stubElement.querySelector('svg')
          );
        }

        continue;
      }

      const dimensions = isFromAssets ?
        getImageSize(
          Path.join(__dirname, '../_site/', image.src)
        ) : void 0;
      console.log(`Transform ${image.src}`, { isFromAssets, dimensions });

      const fastImage = createFastImage(document, image, {
        width: dimensions.width,
        height: dimensions.height
      });

      if (!image.hasAttribute(skipAttribute))
      {
        image.replaceWith(fastImage.fragment);
      } else
      {
        image.removeAttribute('data-no-transform');
      }

      if (image.hasAttribute('data-no-responsive'))
      {
        image.removeAttribute('data-no-responsive');
        continue;
      }

      let sourceSetURLs = [];

      // Add the srcsets to the image.
      for (const imageSize of imageSizes)
      {
        const { suffix, width } = imageSize;
        const { name: fileName, ext, dir } = Path.parse(image.src);

        if (ext === '.gif')
        {
          // We don't fuck with gifs. More importantly, Jimp doesn't either.
          continue;
        }

        const newFileName = `${fileName}.${suffix}${ext}`;
        const fullPath = Path.resolve(__dirname, '../_site/', `.${image.src}`);
        const fullNewPath = Path.join(
          Path.resolve(__dirname, '../_site/'),
          dir,
          newFileName
        );
        const jimpImage = await Jimp.read(fullPath);
        promises.push(jimpImage.resize(width, Jimp.AUTO).writeAsync(fullNewPath));
        const newImageSrc = Path.join(dir, newFileName);

        console.log(`Responsive ${image.src}`, {
          imageSize,
          dir,
          fullPath,
          newFileName,
          fullNewPath
        });

        sourceSetURLs.push(newImageSrc);
      }

      const srcset = imageSizes.map(
        (size, index) => `${sourceSetURLs[index]} ${size.width}w`
      );

      const sizes = imageSizes.map(
        (size) => `(max-width: ${size.width + 200}px) ${size.width}px`
      );

      srcset.push(`${image.src} 1024w`)
      sizes.push(`(max-width: 1024px) 1024px`)

      fastImage.setAttributes({
        srcset: srcset.join(', '),
        sizes: sizes.join(', ')
      });

      console.log({
        srcset: fastImage.newImage.getAttribute('srcset'),
        sizes: fastImage.newImage.getAttribute('sizes'),
        script: fastImage.scriptElement.innerHTML
      });

      image.replaceWith(fastImage.fragment);
    }

    await FS.writeFile(fullPath, Util.getCompleteDocumentHTML(document));
  }

  await Promise.all(promises);
  console.log('All done.');
  await changeImageSizes();
  console.log('Compression complete.');
})();