# PathFinder – Smarter Admissions, Simpler Bookings 🎓

A modern, full-stack college admission booking platform built using Next.js (App Router), Redux Toolkit, RTK Query, JWT, and MongoDB. PathFinder helps students search colleges, apply for admission, submit reviews, and track their applications — all in one responsive and user-friendly platform.

---

## 🚀 Live Demo

🌐 [View Live Site](https://path-finder-sourav.vercel.app)

## 🧾 Job Task Overview

This project was built based on a MERN Stack Developer Job Task requirement which involved:

- Creating a fully functional **College Admission Web Application**
- Using **Next.js with App Router**, **Redux Toolkit**, **RTK Query**, **JWT Authentication**
- Implementing **college search, admission, review, profile management**, and **protected routes**

---

## 🧩 Features

- 🔍 **College Search** – Filter colleges by name in real-time
- 🏫 **College Listing** – 5–6 colleges with images, ratings, research count, and more
- 📄 **College Details** – Events, sports, research, admission info with image gallery
- 📝 **Admission Form** – User can submit a form with personal details and image
- ✅ **My College Dashboard** – User's admission data and ability to add reviews
- 🌟 **Review System** – Rate and review colleges; feedback is shown on the homepage
- 🔐 **Authentication** –
  - Email & password registration/login
  - Google and social login via NextAuth or custom JWT
  - Password reset
- 👤 **User Profile** – Editable name, email, university, and address
- 🧭 **Navigation Bar** – Includes Home, Colleges, Admission, My College
- ⚠️ **404 Page** – Creative not found page
- 📱 **Fully Responsive** – Optimized for desktop, tablet, and mobile

---

## 🔧 Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| Framework   | Next.js (App Router)             |
| State Mgmt  | Redux Toolkit + RTK Query        |
| Auth        | JWT + Google OAuth (or NextAuth) |
| Backend API | Node.js + Express.js             |
| Database    | MongoDB (Mongoose)               |
| Styling     | Tailwind CSS                     |
| Deployment  | Vercel / Render                  |

---

## 📁 Folder Structure
/app
├── page.tsx # Homepage
├── colleges/ # College list & details
├── admission/ # Admission form route
├── dashboard/ # My college dashboard
├── profile/ # Profile view/edit
├── login/ /register/ # Auth routes
├── not-found.tsx # 404 Page

/components # Reusable UI components
/features # Redux slices & RTK API
/lib # Utility & helper functions
/hooks # Custom hooks
/public # Images & assets
/styles # Tailwind/global styles
/middleware.ts # Auth protection middleware


---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pathfinder-college-booking.git
cd pathfinder-college-booking

npm install
# or
yarn install

NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000

npm run dev
# or
yarn dev

🧠 Future Improvements
Admin Panel for managing colleges

Advanced search/filtering

Payment integration for admission

PDF generation for admission slips

📸 Screenshots
(Add screenshots of homepage, college detail, admission form, my college, profile, etc.)

📫 Contact
Sourav Debnath
📍 Brahmanbaria, Dhaka, Bangladesh
💼 LinkedIn
🌐 Portfolio: your-portfolio.com
📧 Email: your.email@example.com

📄 License
This project is open source and available under the MIT License.

python
Copy
Edit

---

Let me know if you want:
- A Bengali version of the README  
- A contribution guide (`CONTRIBUTING.md`)  
- Tailored API route documentation for the backend  
- Environment setup with NextAuth if you're mixing JWT and Google Login

I'll gladly help!
