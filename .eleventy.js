const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [300, 600, 900],
    formats: ["avif", "webp", "jpeg"],
    urlPath: "/assets/images/optimized/",
    outputDir: "./_site/assets/images/optimized/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

  // Parse YAML files in _data
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

  // Copy static assets to the output folder
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Group items by a key
  eleventyConfig.addFilter("groupBy", function(array, key) {
    const result = {};
    array.forEach(item => {
      const val = item[key] || "Other";
      if (!result[val]) {
        result[val] = [];
      }
      result[val].push(item);
    });
    return result;
  });

  // Add global data for current year
  eleventyConfig.addGlobalData("currentYear", () => {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
