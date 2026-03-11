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

  // Add endsWith filter
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    return str.endsWith(suffix);
  });

  // Add global data for current year
  eleventyConfig.addGlobalData("currentYear", () => {
    return new Date().getFullYear();
  });

  // Batch an array into subarrays of length N
  eleventyConfig.addFilter("chunks", function(array, size) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
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