#!/usr/bin/env node

/**
 * Environment Check Script
 * 
 * This script verifies that Node.js and npm are properly installed
 * and displays their versions. It provides a welcome message to
 * confirm the development environment is ready.
 * 
 * Usage: node check-env.js
 *        npm start
 *        npm run check-versions
 */

const { execSync } = require('child_process');
const os = require('os');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Helper function to print colored text
function printColor(color, text) {
  console.log(`${color}${text}${colors.reset}`);
}

// Helper function to execute command and get output
function execCommand(command) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    return null;
  }
}

// Main function to check environment
function checkEnvironment() {
  console.log('\n');
  printColor(colors.cyan, '╔════════════════════════════════════════════════════════════╗');
  printColor(colors.cyan, '║                                                            ║');
  printColor(colors.cyan, '║          CODEVEDA DEVELOPMENT ENVIRONMENT CHECK             ║');
  printColor(colors.cyan, '║                                                            ║');
  printColor(colors.cyan, '╚════════════════════════════════════════════════════════════╝');
  console.log('\n');

  // Get system information
  const platform = os.platform();
  const release = os.release();
  const arch = os.arch();
  const hostname = os.hostname();

  printColor(colors.blue, '📊 System Information:');
  console.log(`   Platform: ${platform}`);
  console.log(`   OS Release: ${release}`);
  console.log(`   Architecture: ${arch}`);
  console.log(`   Hostname: ${hostname}`);
  console.log('\n');

  // Check Node.js
  printColor(colors.blue, '🔍 Checking Node.js...');
  const nodeVersion = execCommand('node --version');
  
  if (nodeVersion) {
    printColor(colors.green, `   ✅ Node.js is installed: ${nodeVersion}`);
    
    // Check if version meets minimum requirement (v18+)
    const versionNumber = nodeVersion.replace('v', '').split('.')[0];
    if (parseInt(versionNumber) >= 18) {
      printColor(colors.green, `   ✅ Node.js version meets requirement (>= 18.0.0)`);
    } else {
      printColor(colors.yellow, `   ⚠️  Node.js version is below recommended (18.0.0)`);
    }
  } else {
    printColor(colors.red, '   ❌ Node.js is NOT installed');
    printColor(colors.yellow, '   💡 Please install Node.js from https://nodejs.org/');
  }
  console.log('\n');

  // Check npm
  printColor(colors.blue, '🔍 Checking npm...');
  const npmVersion = execCommand('npm --version');
  
  if (npmVersion) {
    printColor(colors.green, `   ✅ npm is installed: ${npmVersion}`);
    
    // Check if version meets minimum requirement (9+)
    const versionNumber = npmVersion.split('.')[0];
    if (parseInt(versionNumber) >= 9) {
      printColor(colors.green, `   ✅ npm version meets requirement (>= 9.0.0)`);
    } else {
      printColor(colors.yellow, `   ⚠️  npm version is below recommended (9.0.0)`);
    }
  } else {
    printColor(colors.red, '   ❌ npm is NOT installed');
    printColor(colors.yellow, '   💡 npm usually comes with Node.js. Please reinstall Node.js.');
  }
  console.log('\n');

  // Check PostgreSQL (optional)
  printColor(colors.blue, '🔍 Checking PostgreSQL...');
  const psqlVersion = execCommand('psql --version');
  
  if (psqlVersion) {
    printColor(colors.green, `   ✅ PostgreSQL is installed: ${psqlVersion}`);
  } else {
    printColor(colors.yellow, '   ⚠️  PostgreSQL is NOT found in PATH');
    printColor(colors.yellow, '   💡 If installed, ensure it\'s added to system PATH');
  }
  console.log('\n');

  // Check Git (optional)
  printColor(colors.blue, '🔍 Checking Git...');
  const gitVersion = execCommand('git --version');
  
  if (gitVersion) {
    printColor(colors.green, `   ✅ Git is installed: ${gitVersion}`);
  } else {
    printColor(colors.yellow, '   ⚠️  Git is NOT installed');
    printColor(colors.yellow, '   💡 Install Git from https://git-scm.com/');
  }
  console.log('\n');

  // Summary
  printColor(colors.cyan, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  const nodeInstalled = nodeVersion !== null;
  const npmInstalled = npmVersion !== null;
  
  if (nodeInstalled && npmInstalled) {
    printColor(colors.green, '🎉 SUCCESS! Your development environment is ready!');
    printColor(colors.green, '   You can proceed with the next tasks.');
  } else {
    printColor(colors.red, '❌ INCOMPLETE! Please install missing components.');
    printColor(colors.yellow, '   Refer to the README.md for installation instructions.');
  }
  
  printColor(colors.cyan, '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n');

  // Additional helpful information
  printColor(colors.bright, '📚 Quick Reference:');
  console.log('   Check Node.js version: node --version');
  console.log('   Check npm version:    npm --version');
  console.log('   Check Git version:     git --version');
  console.log('   Check PostgreSQL:      psql --version');
  console.log('   Run this script:       npm start');
  console.log('\n');
  
  printColor(colors.bright, '📖 For detailed setup instructions, see README.md');
  console.log('\n');
}

// Run the environment check
try {
  checkEnvironment();
} catch (error) {
  printColor(colors.red, '❌ An error occurred while checking the environment:');
  console.error(error.message);
  process.exit(1);
}
