export default {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "prerequisiteSkills",
      title: "prerequisiteSkills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "path",
      title: "path",
      type: "reference",
      to: { type: "path" },
    },
    {
      name: "wizard",
      title: "wizard",
      type: "reference",
      to: [{ type: "character" }],
    },
  ],
};
