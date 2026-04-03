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
            fs.cpSync(devSourcePath, agentPath, { recursive: true });
            console.log("✅ .agent folder installed successfully!");
        } else {
            // Production mode: clone from GitHub
            const tempDir = path.join(targetDir, ".dev-ag-kit-temp");
            console.log("📦 Downloading latest version...");
            execSync(`git clone --depth 1 ${REPO_URL} ${tempDir}`, {
                stdio: "ignore",
            });

            // Copy .agent folder
            const sourceAgent = path.join(tempDir, AGENT_DIR);
            if (fs.existsSync(sourceAgent)) {
                fs.cpSync(sourceAgent, agentPath, { recursive: true });
                console.log("✅ .agent folder installed successfully!");
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
        // Backup existing .agent
        const backupPath = path.join(targetDir, ".agent.backup");
        if (fs.existsSync(backupPath)) {
            fs.rmSync(backupPath, { recursive: true, force: true });
        }
        fs.renameSync(agentPath, backupPath);

        // Download latest
        const tempDir = path.join(targetDir, ".dev-ag-kit-temp");
        console.log("📦 Downloading latest version...");
        execSync(`git clone --depth 1 ${REPO_URL} ${tempDir}`, {
            stdio: "ignore",
        });

        // Copy new .agent folder
        const sourceAgent = path.join(tempDir, AGENT_DIR);
        if (fs.existsSync(sourceAgent)) {
            fs.cpSync(sourceAgent, agentPath, { recursive: true });
            console.log("✅ Updated successfully!");

            // Remove backup
            fs.rmSync(backupPath, { recursive: true, force: true });
        } else {
            // Restore backup on failure
            fs.renameSync(backupPath, agentPath);
            throw new Error(".agent folder not found in repository");
        }

        // Cleanup
        fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
        console.error("❌ Update failed:", error.message);
        process.exit(1);
    }
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
