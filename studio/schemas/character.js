export default {
  name: "character",
  title: "Character",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
  {
    name: "characterType",
    title: "character type",
    type: "string",
    options: {
      list: ["hunter", "wizard", "warrior", "druid"]
    }
  }
  ],
};
