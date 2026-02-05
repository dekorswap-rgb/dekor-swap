# 🚀 Quick Push Guide - DekorSwap

## ✅ What's Done
- ✓ Fixed detached HEAD state
- ✓ Checked out main branch
- ✓ Committed all changes (Commit: 46770a6)

## 🔑 Now: Push to GitHub

Since you're using a different GitHub account, you'll need to authenticate. Here's the **easiest method**:

### **Method 1: Personal Access Token (Recommended)**

#### **Step 1: Create a Personal Access Token**
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Settings:
   - **Note**: `DekorSwap Deployment`
   - **Expiration**: 90 days (or your preference)
   - **Scopes**: Check `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **COPY THE TOKEN** immediately (you won't see it again!)

#### **Step 2: Push Using the Token**

**Option A - Enter token when prompted:**
```bash
git push origin main
```
When prompted for password, **paste your token** (not your GitHub password!)

**Option B - Include token in URL (one-time):**
```bash
git push https://YOUR_TOKEN@github.com/dekorswap-rgb/dekor-swap.git main
```
Replace `YOUR_TOKEN` with the token you copied.

---

### **Method 2: GitHub CLI (Alternative)**

If you have GitHub CLI installed:
```bash
gh auth login
# Follow the prompts to authenticate
git push origin main
```

---

### **Method 3: SSH Key (For Future)**

For long-term use, set up SSH:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy the public key
cat ~/.ssh/id_ed25519.pub
```
Then add it to GitHub: https://github.com/settings/keys

---

## 📋 After Pushing Successfully

### **1. Enable GitHub Pages**
1. Go to: https://github.com/dekorswap-rgb/dekor-swap/settings/pages
2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
3. Click **Save**

### **2. Grant Workflow Permissions**
1. Go to: https://github.com/dekorswap-rgb/dekor-swap/settings/actions
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

### **3. Verify Deployment**
1. Go to the **Actions** tab: https://github.com/dekorswap-rgb/dekor-swap/actions
2. You should see a workflow running
3. Wait for it to complete (~2-3 minutes)
4. Visit your site:
   - **GitHub Pages**: https://dekorswap-rgb.github.io/dekor-swap/
   - **Custom Domain**: https://dekorswap.com

---

## 🐛 Troubleshooting

### **"Authentication failed"**
- Make sure you're using the **token** as password, not your GitHub password
- Verify the token has `repo` scope

### **"Permission denied"**
- Check that you have write access to the repository
- Verify you're logged in to the correct GitHub account

### **"Updates were rejected"**
```bash
git pull origin main --rebase
git push origin main
```

---

## 📞 Need Help?

If you encounter any errors:
1. Copy the exact error message
2. Let me know which step you're on
3. I'll help you resolve it!

---

## ⚡ Quick Command Summary

```bash
# 1. Push to GitHub (you'll be prompted for credentials)
git push origin main

# 2. After successful push, the GitHub Actions workflow will:
#    - Build your Next.js app
#    - Export static files
#    - Deploy to GitHub Pages
#    - Your site will be live!
```

**Your changes are ready to push! 🎉**
