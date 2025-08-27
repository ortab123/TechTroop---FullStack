const postSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "content", "tags"],
  properties: {
    title: { type: "string", minLength: 5, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    tags: {
      type: "array",
      items: { type: "string" },
    },
    category: { type: "string", minLength: 2, maxLength: 50 },
  },
};

module.exports = { postSchema };
