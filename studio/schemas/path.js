export default {
  name: "path",
  title: "Path",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "originSkill",
      title: "originSkill",
      type: "reference",
      to: [{ type: "skill" }],
    },
  ],
};
