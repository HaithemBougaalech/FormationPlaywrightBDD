const { execSync, spawn } = require("child_process");

const fs = require("fs");
//Vérifie si le dossier allure existe déjà
if (fs.existsSync("allure-results")) {
    //supprimer le dossier avec son contenu
  fs.rmSync("allure-results", { recursive: true });
} 
//sert à la recréation d'un nouveau dossier pour stocker les nouveaux résultats
fs.mkdirSync("allure-results");

console.log('Lancement des tests');
try {
  execSync("cucumber-js --config cucumber.config.js", {
    stdio: "inherit",
  });
} catch (e) {
  // Tests échoués → on continue quand même pour générer le rapport
}

const files = fs.readdirSync("allure-results"); 
console.log('allure-results contient', files.length, 'fichiers.');

//si le dossier est vide alors on arrête l'exécution
if (files.length === 0) {
  process.exit(1);
}

const now = new Date();

const pad = (n) => String(n).padStart(2, "0");

const timestamp =
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
  `_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

const outputDir = `allure-report/${timestamp}`;

execSync(`allure generate allure-results --clean -o ${outputDir}`, {
  stdio: "inherit",
});

// en mode async 
/*const server = spawn('allure', ['open', outputDir], {

  stdio: 'inherit',

  detached: false,

});*/

// en mode synchrone execSync
execSync (`npx allure open ${outputDir}`, {
  stdio: "inherit",
});
