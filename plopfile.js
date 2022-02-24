const GENERATED_DIR = "src/components/generated";
const TEMPLATES_DIR = ".plop-templates/component";

module.exports = (/** @type {import("plop").NodePlopAPI} */ plop) => {
  /** plop component <name: string> */
  plop.setGenerator("component", {
    description: "Create a new component from template",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please insert component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${GENERATED_DIR}/{{pascalCase name}}/{{pascalCase name}}.tsx`,
        templateFile: `${TEMPLATES_DIR}/Component.tsx.hbs`,
      },
      {
        type: "add",
        path: `${GENERATED_DIR}/{{pascalCase name}}/{{pascalCase name}}.module.scss`,
        templateFile: `${TEMPLATES_DIR}/Component.module.scss.hbs`,
      },
      {
        type: "add",
        path: `${GENERATED_DIR}/{{pascalCase name}}/index.ts`,
        templateFile: `${TEMPLATES_DIR}/index.ts.hbs`,
      },
    ],
  });
};
