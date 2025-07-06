module.exports = function(eleventyConfig) {
  // Copy static assets to the output folder
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/js");

  // Add endsWith filter
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    return str.endsWith(suffix);
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