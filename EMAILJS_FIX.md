# 🚨 URGENT FIX: EmailJS "Recipients address is empty" Error

## The Problem

Error: `"The recipients address is empty"` (Status 422)

This means your EmailJS template is not configured with a recipient email address.

---

## ✅ SOLUTION: Update EmailJS Template Settings

### **Step 1: Go to EmailJS Dashboard**
1. Log in to https://dashboard.emailjs.com/
2. Click on **"Email Templates"** in the left sidebar
3. Find your template: **template_s5u472g**
4. Click **"Edit"** or click on the template name

### **Step 2: Configure "To Email" Field**

In the template settings, find the **"Settings"** tab or **"To Email"** field.

**IMPORTANT**: Set the "To Email" field to:
```
dekorswap@gmail.com
```

**DO NOT use** `{{to_email}}` - use the actual email address directly!

### **Step 3: Verify Template Variables**

Make sure your template body includes these variables (they should already be there):

```
{{from_name}}
{{from_email}}
{{phone}}
{{rental_items}}
{{monthly_budget}}
{{usage_location}}
{{whatsapp}}
{{additional_comments}}
{{timestamp}}
```

### **Step 4: Save Template**

Click **"Save"** at the bottom of the template editor.

---

## 🧪 Test Again

1. Go back to http://localhost:3000/get-started
2. Fill out the form
3. Click "Submit Inquiry"
4. It should work now! ✅

---

## 📧 Expected Email Format

After fixing, you should receive emails like this:

```
To: dekorswap@gmail.com
From: DekorSwap Website
Subject: New Customer Inquiry from [Customer Name]

New Customer Inquiry - DekorSwap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: John Doe
Email: john@example.com
Phone: +91 9876543210

PREFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Items to Rent: Lamps, Plants
Monthly Budget: ₹1499
Usage Location: Home, Office
WhatsApp: +91 9876543210

ADDITIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Looking forward to trying your service!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: 2/5/2026, 8:05:00 PM

Reply to this customer at: john@example.com
```

---

## 🎯 Quick Checklist

- [ ] Log in to EmailJS dashboard
- [ ] Open template **template_s5u472g**
- [ ] Set "To Email" to **dekorswap@gmail.com** (not {{to_email}})
- [ ] Save template
- [ ] Test form again

---

## 🔍 Alternative: Check Template Settings Screenshot

Your template should look like this:

**Settings Tab:**
- **To Email**: `dekorswap@gmail.com`
- **From Name**: `DekorSwap Website` or `{{from_name}}`
- **From Email**: Your verified email (from Gmail service)
- **Reply To**: `{{from_email}}` (customer's email)
- **Subject**: `New Customer Inquiry from {{from_name}}`

---

## ❓ Still Not Working?

If you still get the error after fixing:

1. **Clear browser cache** and refresh
2. **Check EmailJS logs**: Dashboard → Logs
3. **Verify Gmail service** is connected properly
4. **Double-check template ID** matches in code: `template_s5u472g`

---

**The fix is simple: Just set the "To Email" in your EmailJS template to `dekorswap@gmail.com` directly!** ✅
