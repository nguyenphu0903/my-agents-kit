#!/usr/bin/env node

/**
 * AI Agent Kit CLI
 * @duyphu/dev-ag-kit
 *
 * Install .agent folder into your project
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REPO_URL = "https://github.com/nguyenphu0903/my-agents-kit.git";
const AGENT_DIR = ".agent";
const INSTALL_PATHS = [
    ".agent",
    "AGENTS.md",
    "GEMINI.md",
    "CLAUDE.md",
    ".claude",
    ".cursor",
];

function main() {
    const args = process.argv.slice(2);
    const command = args[0] || "init";

    switch (command) {
        case "init":
            initAgentKit();
            break;
        case "update":
            updateAgentKit();
            break;
        case "status":
            checkStatus();
            break;
        default:
            console.log("Usage: dev-ag-kit [init|update|status]");
            process.exit(1);
    }
}

function initAgentKit() {
    console.log("🚀 Installing AI Agent Kit...");

    const targetDir = process.cwd();
    const agentPath = path.join(targetDir, AGENT_DIR);

    if (fs.existsSync(agentPath)) {
        console.log("⚠️  .agent folder already exists!");
        console.log('Use --force to overwrite or run "dev-ag-kit update"');
        process.exit(1);
    }

    try {
        // Check if running in development mode (local testing)
        const devSourcePath = path.join(__dirname, "..", AGENT_DIR);

        if (fs.existsSync(devSourcePath)) {
            // Development mode: copy from local
            console.log("📦 Using local development version...");
            installAssets(path.join(__dirname, ".."), targetDir);
            console.log("✅ Agent kit installed successfully!");
        } else {
            // Production mode: clone from GitHub
            const tempDir = path.join(targetDir, ".dev-ag-kit-temp");
            console.log("📦 Downloading latest version...");
            execSync(`git clone --depth 1 ${REPO_URL} ${tempDir}`, {
                stdio: "ignore",
            });

            if (fs.existsSync(path.join(tempDir, AGENT_DIR))) {
                installAssets(tempDir, targetDir);
                console.log("✅ Agent kit installed successfully!");
            } else {
                throw new Error(".agent folder not found in repository");
            }

            // Cleanup
            fs.rmSync(tempDir, { recursive: true, force: true });
        }

        // Auto-exclude .agent from git (if git repo exists)
        const gitExcludePath = path.join(targetDir, ".git", "info", "exclude");
        if (fs.existsSync(path.join(targetDir, ".git"))) {
            try {
                let excludeContent = "";
                if (fs.existsSync(gitExcludePath)) {
                    excludeContent = fs.readFileSync(gitExcludePath, "utf8");
                }

                // Add .agent to exclude if not already there
                if (!excludeContent.includes(".agent")) {
                    excludeContent += "\n# AI Agent Kit\n.agent/\n";
                    fs.writeFileSync(gitExcludePath, excludeContent);
                    console.log("✅ Added .agent to git exclude (local only)");
                }
            } catch (err) {
                // Silently fail if can't write to git exclude
                console.log(
                    '⚠️  Could not auto-exclude from git (run manually: echo ".agent/" >> .git/info/exclude)',
                );
            }
        }

        console.log("");
        console.log("🎯 AI Agent Kit is ready!");
        console.log("");
        console.log("📚 Available agents:");
        console.log("  - golang-specialist (Go, Kafka, NATS, Redis)");
        console.log("  - backend-specialist (Node.js, Python, API)");
        console.log("  - frontend-specialist (React, Next.js, UI/UX)");
        console.log("  - mobile-developer (React Native, Flutter)");
        console.log("  - And 11 more...");
        console.log("");
        console.log('💡 Try: "Use golang-specialist to review this Go code"');
    } catch (error) {
        console.error("❌ Installation failed:", error.message);
        process.exit(1);
    }
}

function updateAgentKit() {
    console.log("🔄 Updating AI Agent Kit...");

    const targetDir = process.cwd();
    const agentPath = path.join(targetDir, AGENT_DIR);

    if (!fs.existsSync(agentPath)) {
        console.log(
            '⚠️  .agent folder not found. Run "dev-ag-kit init" first.',
        );
        process.exit(1);
    }

    try {
        // Backup existing installed assets
        const backupPath = path.join(targetDir, ".agent.backup");
        resetDir(backupPath);
        backupInstalledAssets(targetDir, backupPath);

        // Download latest
        const tempDir = path.join(targetDir, ".dev-ag-kit-temp");
        console.log("📦 Downloading latest version...");
        execSync(`git clone --depth 1 ${REPO_URL} ${tempDir}`, {
            stdio: "ignore",
        });

        if (fs.existsSync(path.join(tempDir, AGENT_DIR))) {
            removeInstalledAssets(targetDir);
            installAssets(tempDir, targetDir);
            console.log("✅ Updated successfully!");

            // Remove backup
            fs.rmSync(backupPath, { recursive: true, force: true });
        } else {
            // Restore backup on failure
            restoreInstalledAssets(backupPath, targetDir);
            throw new Error(".agent folder not found in repository");
        }

        // Cleanup
        fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
        console.error("❌ Update failed:", error.message);
        process.exit(1);
    }
}

function installAssets(sourceRoot, targetDir) {
    for (const relativePath of INSTALL_PATHS) {
        const sourcePath = path.join(sourceRoot, relativePath);
        const targetPath = path.join(targetDir, relativePath);

        if (!fs.existsSync(sourcePath)) {
            continue;
        }

        fs.cpSync(sourcePath, targetPath, { recursive: true });
    }
}

function removeInstalledAssets(targetDir) {
    for (const relativePath of INSTALL_PATHS) {
        fs.rmSync(path.join(targetDir, relativePath), {
            recursive: true,
            force: true,
        });
    }
}

function backupInstalledAssets(targetDir, backupDir) {
    for (const relativePath of INSTALL_PATHS) {
        const sourcePath = path.join(targetDir, relativePath);
        const backupPath = path.join(backupDir, relativePath);

        if (!fs.existsSync(sourcePath)) {
            continue;
        }

        fs.cpSync(sourcePath, backupPath, { recursive: true });
    }
}

function restoreInstalledAssets(backupDir, targetDir) {
    removeInstalledAssets(targetDir);
    installAssets(backupDir, targetDir);
}

function resetDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
    fs.mkdirSync(dirPath, { recursive: true });
}

function checkStatus() {
    const targetDir = process.cwd();
    const agentPath = path.join(targetDir, AGENT_DIR);

    console.log("📊 AI Agent Kit Status");
    console.log("");

    if (fs.existsSync(agentPath)) {
        console.log("✅ Installed");

        // Count agents and skills
        const agentsPath = path.join(agentPath, "agents");
        const skillsPath = path.join(agentPath, "skills");

        if (fs.existsSync(agentsPath)) {
            const agents = fs
                .readdirSync(agentsPath)
                .filter((f) => f.endsWith(".md"));
            console.log(`   Agents: ${agents.length}`);
        }

        if (fs.existsSync(skillsPath)) {
            const skills = fs
                .readdirSync(skillsPath)
                .filter((f) =>
                    fs.statSync(path.join(skillsPath, f)).isDirectory(),
                );
            console.log(`   Skills: ${skills.length}`);
        }
    } else {
        console.log("❌ Not installed");
        console.log('   Run "dev-ag-kit init" to install');
    }
}

main();
