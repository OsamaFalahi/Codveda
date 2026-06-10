# Level 1 - Task 1: Setup Development Environment

## Overview
This task focuses on setting up a professional development environment for full-stack development at Codveda. The environment includes Node.js, npm/yarn, PostgreSQL database, and essential terminal commands.

---

## 📋 Prerequisites
- A computer with Windows, macOS, or Linux operating system
- Internet connection for downloading necessary tools
- Administrator privileges (for installation)

---

## 🔧 Step-by-Step Guide: Checking Node.js and npm Installation

### 1. Check if Node.js is Installed
Open your terminal and run:

```bash
node --version
```

**Expected Output:** A version number like `v18.17.0` or `v20.10.0`

### 2. Check if npm is Installed
```bash
npm --version
```

**Expected Output:** A version number like `9.6.7` or `10.2.4`

### 3. If Not Installed

#### For Windows:
1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Run the installer (LTS version recommended)
3. Follow the installation wizard
4. Restart your terminal

#### For macOS:
```bash
# Using Homebrew
brew install node
```

#### For Linux (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Verify Installation
After installation, run the check script provided in this directory:

```bash
node check-env.js
```

---

## 💻 Essential Terminal Commands

### Navigation Commands

| Command | Description | Example |
|---------|-------------|---------|
| `pwd` | Print working directory (show current path) | `pwd` |
| `ls` | List files and directories | `ls` or `ls -la` |
| `cd` | Change directory | `cd folder-name` |
| `cd ..` | Go up one directory level | `cd ..` |
| `cd ~` | Go to home directory | `cd ~` |
| `mkdir` | Create a new directory | `mkdir new-folder` |
| `rmdir` | Remove an empty directory | `rmdir folder-name` |
| `rm -rf` | Remove directory and its contents (use carefully!) | `rm -rf folder-name` |

### File Operations

| Command | Description | Example |
|---------|-------------|---------|
| `touch` | Create an empty file | `touch file.txt` |
| `cat` | Display file contents | `cat file.txt` |
| `nano` | Open file in nano editor | `nano file.txt` |
| `cp` | Copy file/directory | `cp source.txt dest.txt` |
| `mv` | Move/rename file | `mv old.txt new.txt` |
| `rm` | Remove file | `rm file.txt` |

### System Information

| Command | Description | Example |
|---------|-------------|---------|
| `clear` | Clear terminal screen | `clear` |
| `history` | Show command history | `history` |
| `whoami` | Show current user | `whoami` |
| `date` | Show current date/time | `date` |

---

## 🌿 Git Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `git init` | Initialize a new Git repository | `git init` |
| `git status` | Show working directory status | `git status` |
| `git add` | Stage files for commit | `git add .` or `git add file.txt` |
| `git commit` | Commit staged changes | `git commit -m "message"` |
| `git branch` | List/create branches | `git branch` or `git branch new-branch` |
| `git checkout` | Switch branches | `git checkout branch-name` |
| `git push` | Push commits to remote | `git push origin main` |
| `git pull` | Pull changes from remote | `git pull origin main` |
| `git clone` | Clone a repository | `git clone https://repo.url` |
| `git log` | Show commit history | `git log` |

### Common Git Workflow
```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Create and switch to new branch
git checkout -b feature-branch

# Push to remote
git push origin feature-branch
```

---

## 🗄️ PostgreSQL Database Setup

### 1. Installation

#### For Windows:
1. Download from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Set a password for the postgres user (remember it!)
4. Complete installation with default settings

#### For macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### For Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### 2. Verify Installation
```bash
psql --version
```

### 3. Start PostgreSQL Service

#### Windows:
- PostgreSQL runs as a service automatically after installation
- Check Services: `services.msc` → Look for "postgresql-x64-xx"

#### macOS:
```bash
brew services start postgresql
```

#### Linux:
```bash
sudo service postgresql start
# or
sudo systemctl start postgresql
```

### 4. Connect to PostgreSQL
```bash
# Connect as default postgres user
psql -U postgres

# Or connect to a specific database
psql -U postgres -d database_name
```

### 5. Create a New Database
```sql
-- After connecting to psql
CREATE DATABASE codveda_training;

-- Connect to the new database
\c codveda_training;

-- Create a sample table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');

-- Query the table
SELECT * FROM users;

-- Exit psql
\q
```

### 6. Useful psql Commands

| Command | Description |
|---------|-------------|
| `\l` | List all databases |
| `\c dbname` | Connect to database |
| `\dt` | List all tables |
| `\d tablename` | Describe table structure |
| `\q` | Quit psql |
| `\h` | Help for SQL commands |
| `\?` | Help for psql commands |

---

## 🚀 Quick Start with This Project

### 1. Check Your Environment
```bash
node check-env.js
```

### 2. Install Dependencies (when package.json has dependencies)
```bash
npm install
```

### 3. Run Custom Scripts
```bash
# Check versions
npm run check-versions

# Start the project (when configured)
npm start
```

---

## 📝 Project Structure
```
Task-1-Setup-Environment/
├── README.md              # This file
├── package.json           # Project configuration
└── check-env.js           # Environment check script
```

---

## ✅ Verification Checklist

- [ ] Node.js is installed (version 18+ recommended)
- [ ] npm is installed and working
- [ ] PostgreSQL is installed and running
- [ ] Can connect to PostgreSQL via psql
- [ ] Terminal commands are familiar
- [ ] Git commands are understood
- [ ] check-env.js runs successfully

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book)

---

## 🎯 Next Steps

After completing this environment setup:
1. Proceed to **Task 2: Simple REST API**
2. Start building your first backend API
3. Connect to the PostgreSQL database
4. Implement CRUD operations

---

**Prepared by:** Codveda Training Intern  
**Date:** June 2026  
**Level:** 1 - Task 1
