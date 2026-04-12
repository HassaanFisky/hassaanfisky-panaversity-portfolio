// run-prompt.js
// Usage: node scripts/run-prompt.js --task "refactor-ui"

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const taskArg = args.indexOf("--task");
const taskName = taskArg > -1 ? args[taskArg + 1] : null;

if (!taskName) {
  console.error("❌ Please provide a task name: --task 'refactor-ui'");
  process.exit(1);
}

const promptPath = path.join(__dirname, "../history/prompts", `${taskName}.md`);

if (!fs.existsSync(promptPath)) {
  console.error(`❌ Prompt file not found: ${promptPath}`);
  process.exit(1);
}

console.log(`🤖 Reading prompt: ${taskName}...`);
const promptContent = fs.readFileSync(promptPath, "utf8");

console.log("🚀 Executing with Gemini CLI...");
// In a real scenario, this would pipe to gemini-cli
// For now, we simulate or print instructions
console.log("\n--- PROMPT START ---");
console.log(promptContent.substring(0, 200) + "...");
console.log("--- PROMPT END ---\n");
console.log("✅ Ready to pipe to: gemini-cli run");
