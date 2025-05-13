# 🏊 swim-project

A **feature-rich, full-stack web app** built with **Next.js 15**, **TailwindCSS**, and **Radix UI**, utilizing **React Query**, **Zustand**, and **Drizzle ORM**. This project is built with a modular and scalable architecture to handle complex forms, data tables, rich text editors, and PostgreSQL-based persistence.

🔗 **Live Demo** – *Coming Soon*

---

## ✨ Features

- ⚡ **Next.js 15** – App Router & Server Actions
- 🎨 **TailwindCSS** – Utility-first, custom animated UI with `tailwindcss-animate`
- 🧩 **Radix UI** – Accessible UI primitives (dialog, popover, tooltip, progress, etc.)
- 🧠 **React Query + Zustand** – Powerful state and data management
- 📋 **Forms & Validation** – `react-hook-form`, `zod`, `@hookform/resolvers`
- 🧾 **Rich Text Editor** – With `CKEditor` and `SunEditor`
- 📆 **Date Pickers** – Jalali + Multi-date support
- 📦 **PostgreSQL Integration** – Via `drizzle-orm` and `pg`
- 🔄 **Drizzle Kit** – Full database schema management
- 📊 **Data Tables** – Built with `@tanstack/react-table`
- 🚀 **Command Menu** – Powered by `cmdk`
- 🔔 **Toasts & Notifications** – Using `sonner` and `toaster`
- 🎠 **Carousel** – `embla-carousel-react`
- 🌙 **Dark Mode** – Configurable via `next-themes`

---

## 📁 Folder Structure (Simplified)

/app # Application routes (Next.js App Router)
/(main) # UI pages and layouts
/components # UI components (Radix, form elements, etc.)
/hooks # Custom React hooks
/lib # Utilities, helpers, constants
/db # Drizzle schema and DB queries
/styles # Tailwind + global CSS
/types # Global TypeScript types
/public # Static assets (images, etc.)


---

## 🧰 Tech Stack

| Category         | Packages / Tools |
|------------------|------------------|
| **Frontend**     | `next`, `react`, `tailwindcss`, `clsx`, `tailwind-merge`, `lucide-react`, `cmdk` |
| **Forms**        | `react-hook-form`, `zod`, `@hookform/resolvers` |
| **Database**     | `pg`, `drizzle-orm`, `drizzle-kit` |
| **Validation**   | `zod`, `drizzle-zod`, `@hono/zod-validator` |
| **State Mgmt**   | `zustand`, `react-use`, `@tanstack/react-query`, `@tanstack/react-query-devtools` |
| **UI Components**| `@radix-ui/react-*`, `react-multi-date-picker`, `embla-carousel-react`, `textarea` |
| **Editors**      | `@ckeditor/ckeditor5-react`, `@ckeditor/ckeditor5-build-classic`, `suneditor`, `suneditor-react` |
| **Utilities**    | `uuid`, `cuid2`, `dotenv`, `html-react-parser`, `jalali-moment` |
| **Dev Tools**    | `eslint`, `typescript`, `postcss`, `tailwindcss`, `tsx` |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/swim-project.git
cd swim-project

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev


Project will be running locally at http://localhost:3000

🛠️ Deployment
This project is designed to be easily deployed with Vercel.

Vercel Settings:

Build Command: npm run build

Output Directory: .next

Or deploy manually to your own Node.js server.

🧾 License
This project is licensed under the MIT License.

🙌 Author
Made with ❤️ by Mohsen Ramshini
