try {
  await loadTypeScript();
  await loadStyles(true);
} catch (error) {
  console.error("failed to run ags!");
  console.error(error);
}

async function loadTypeScript() {
  const entryFile = `${App.configDir}/src/main.ts`;
  const outDir = "/tmp/ags/js";

  const startTime = Date.now();
  await Utils.execAsync([
    "bun",
    "build",
    entryFile,
    "--outdir",
    outDir,
    "--external",
    "resource://*",
    "--external",
    "gi://*",
  ]);

  await import(`file://${outDir}/main.js`);
  console.log(`loaded script in ${Date.now() - startTime}ms`);
}

async function applyStyles(entryFile, outFile) {
  const startTime = Date.now();
  await Utils.execAsync(["sassc", entryFile, outFile]);
  App.applyCss(outFile, true);
  return Date.now() - startTime;
}

async function loadStyles(reloadOnChange) {
  const entryFile = `${App.configDir}/styles/main.scss`;
  const outFile = "/tmp/ags/style.css";

  const time = await applyStyles(entryFile, outFile);
  console.log(`loaded styles in ${time}ms`);

  if (reloadOnChange) {
    Utils.monitorFile(`${App.configDir}/styles`, async function () {
      const time = await applyStyles(entryFile, outFile);
      console.log(`reloaded styles in ${time}ms`);
    });
  }
}
