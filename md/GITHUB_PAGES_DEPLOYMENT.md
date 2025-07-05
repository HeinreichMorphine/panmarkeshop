# GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

This guide will help you deploy your Panmark Enterprise project to GitHub Pages.

### Prerequisites

1. A GitHub account
2. Git installed on your local machine
3. Your project files ready for deployment

### Deployment Steps

1. **Create a GitHub Repository**
   - Go to GitHub.com and create a new repository
   - Name it `panmarkeshop` (or your preferred name)
   - Make it public (required for free GitHub Pages)

2. **Upload Your Files**
   - Clone the repository to your local machine
   - Copy all project files to the repository folder
   - Make sure `index.html` is in the root directory
   - Commit and push your changes

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a green checkmark when deployment is complete

5. **Access Your Site**
   - Your site will be available at: `https://[your-username].github.io/panmarkeshop/`
   - Replace `[your-username]` with your actual GitHub username

### Important Notes

- **File Structure**: Make sure your `index.html` is in the root directory of your repository
- **Asset Paths**: All asset paths should be relative (e.g., `assets/css/style.css` not `/assets/css/style.css`)
- **Case Sensitivity**: GitHub Pages is case-sensitive, so ensure all file names match exactly
- **Branch Name**: If your default branch is `master` instead of `main`, update the deployment settings accordingly

### Troubleshooting

**If you see "404 - File not found":**
- Check that `index.html` exists in the root directory
- Verify all file paths are correct and case-sensitive
- Ensure the repository is public

**If images don't load:**
- Check that image paths are relative (start with `assets/` not `/assets/`)
- Verify image files exist in the correct directories
- Check file extensions match exactly

**If the site doesn't update:**
- Wait a few minutes for GitHub Pages to rebuild
- Check the "Actions" tab in your repository for deployment status
- Clear your browser cache

### Demo Credentials

Once deployed, you can test the application with these demo accounts:

- **Admin:** `admin` / `admin123`
- **Customer:** `john_doe` / `password123`

### Support

If you continue to have issues:
1. Check the GitHub Pages documentation
2. Verify your repository settings
3. Check the browser console for any JavaScript errors
4. Ensure all required files are present in the repository 