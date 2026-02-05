# EmailJS Setup Guide for DekorSwap

## 🎯 Overview

This guide will help you set up EmailJS to receive customer inquiry form submissions at **dekorswap@gmail.com**.

---

## 📧 Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (top right)
3. Create account with your email (can use dekorswap@gmail.com)
4. Verify your email address

---

## ⚙️ Step 2: Add Email Service

1. After login, go to **"Email Services"** in the dashboard
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended)
4. Click **"Connect Account"**
5. Sign in with **dekorswap@gmail.com**
6. Grant permissions
7. **Copy the Service ID** (looks like `service_xxxxxxx`)
8. Click **"Create Service"**

---

## 📝 Step 3: Create Email Template

1. Go to **"Email Templates"** in dashboard
2. Click **"Create New Template"**
3. **Template Name**: "Customer Inquiry Form"
4. **Subject**: `New Customer Inquiry from {{from_name}}`

### **Email Body Template**:

```
New Customer Inquiry - DekorSwap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

PREFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Items to Rent: {{rental_items}}
Monthly Budget: {{monthly_budget}}
Usage Location: {{usage_location}}
WhatsApp: {{whatsapp}}

ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{additional_comments}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: {{timestamp}}

Reply to this customer at: {{from_email}}
```

5. **To Email**: `{{to_email}}` (this will be dekorswap@gmail.com)
6. **From Name**: `DekorSwap Website`
7. **From Email**: Use your verified email
8. **Reply To**: `{{from_email}}`
9. Click **"Save"**
10. **Copy the Template ID** (looks like `template_xxxxxxx`)

---

## 🔑 Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy the Public Key** (looks like a long string)

---

## 💻 Step 5: Update Your Code

Open the file: `src/app/get-started/page.tsx`

Find these lines near the top (around line 13-15):

```typescript
const EMAILJS_SERVICE_ID = "service_dekorswap"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "template_inquiry"; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your public key
```

**Replace with your actual values:**

```typescript
const EMAILJS_SERVICE_ID = "service_xxxxxxx"; // Your Service ID from Step 2
const EMAILJS_TEMPLATE_ID = "template_xxxxxxx"; // Your Template ID from Step 3
const EMAILJS_PUBLIC_KEY = "your_actual_public_key_here"; // Your Public Key from Step 4
```

---

## ✅ Step 6: Test the Form

1. Save the file
2. Go to `http://localhost:3000/get-started` in your browser
3. Fill out the form with test data
4. Click **"Submit Inquiry"**
5. Check **dekorswap@gmail.com** inbox
6. You should receive an email with the form data!

---

## 🚀 Step 7: Deploy to GitHub Pages

Once testing works locally:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add customer inquiry form with EmailJS integration"
   git push origin main
   ```

2. GitHub Actions will build and deploy automatically
3. The form will work on your live site: `https://dekorswap.com/get-started`

---

## 🎨 Accessing the Form

Users can access the form by:
- Clicking **"Get Started"** button in navigation (desktop/mobile)
- Directly visiting: `/get-started`
- All "Get Started" buttons throughout the site now link to this form

---

## 📊 EmailJS Free Tier Limits

- **200 emails per month** (free)
- If you need more, upgrade to paid plan ($7/month for 1000 emails)

---

## 🔒 Security Notes

- ✅ EmailJS Public Key is **safe to expose** in client code
- ✅ Works perfectly with static GitHub Pages
- ✅ No backend server needed
- ⚠️ Consider adding reCAPTCHA later to prevent spam

---

## 🐛 Troubleshooting

### **Form submits but no email received:**
1. Check EmailJS dashboard → "Logs" for errors
2. Verify Service ID, Template ID, and Public Key are correct
3. Check spam folder in Gmail
4. Ensure Gmail service is connected properly

### **"Failed to send" error:**
1. Open browser console (F12) to see detailed error
2. Check if Public Key is correct
3. Verify template variables match the code

### **Email goes to spam:**
1. Add your EmailJS sending address to Gmail contacts
2. Mark first email as "Not Spam"
3. Future emails should arrive in inbox

---

## 📞 Support

If you encounter issues:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Check browser console for error messages

---

## ✨ What's Included in the Form

**Customer Information:**
- Full Name (required)
- Email Address (required)
- Phone Number (required)

**Q1. What would you rent for your space?**
- Carpets/Rugs
- Lamps
- Plants
- Statement décor

**Q2. Comfortable monthly spend?**
- ₹499
- ₹1499

**Q3. Where will you use it?**
- Home
- Office
- Airbnb

**Q4. WhatsApp number (optional)**
- For early access / discount

**Additional Comments** (optional)

---

**All form submissions will be sent to: dekorswap@gmail.com** ✅
