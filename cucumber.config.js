//l'objectif de ce fichier est d'exécuter les tests cucumber
module.exports = {
  default: {
    paths: ["src/features/**/*.feature"],
    require: [
      "src/hooks/hooks.ts",
      "src/support/pageFixture.ts",
      "src/steps/**/*.ts",
    ],
    tags: "@smoke",
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "allure-cucumberjs/reporter",
      ["html", "rapports/cucumber-report.html"],
      ["json", "rapports/cucumber-report.json"],
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
  },
};
