# AuraScanAI - Frontend Application

This repository contains the complete frontend for the AuraScanAI project, a modern, AI-powered application for vehicle damage assessment. The interface is built with **React and TypeScript**, providing a fast, responsive, and intuitive user experience.

This application connects to a live, AI-powered backend API to deliver real-time damage analysis.

**➡️ Live Backend API:** [AuraScanAI API on Hugging Face Spaces](https://huggingface.co/spaces/ehsanulhaque92/AuraScanAI)
*(Note: The live demo of this frontend is not yet deployed. See "Run Locally" instructions below.)*

---

## ✨ Key Features

*   **Modern, Responsive UI:** A stunning, futuristic interface designed with a glassmorphism aesthetic that looks great on all screen sizes.
*   **Interactive File Upload:** Features an intuitive drag-and-drop or click-to-browse file upload system.
*   **Live AI Analysis:** Seamlessly communicates with the backend API to send an image and receive a detailed damage analysis in real-time.
*   **Dynamic Data Visualization:** The Damage Report page is fully dynamic, populating all stat cards, the damage ledger, and a visual bounding box directly from the live API response.
*   **Component-Based Architecture:** Built with a professional, reusable component structure, making the codebase clean, maintainable, and scalable.

---

## 🛠️ Technology Stack

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (via the CDN in this version)
*   **API Communication:** Native `fetch` API

---

## 🚀 Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/) installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/MdEhsanulHaqueKanan/aurascan-frontend.git
cd aurascan-frontend
```

### 2. Install Dependencies
This will download all the necessary packages for the project.

```bash
npm install
```

3. Run the Development Server
This command starts the local Vite development server.

```bash
npm run dev
```

4. Open the App
Open your web browser and navigate to the local URL provided in the terminal (usually http://localhost:5173).

**Important:** For the application to function correctly, the [AuraScanAI backend server](https://github.com/MdEhsanulHaqueKanan/aurascan-api) must be running, either locally on port 5000 or on its public Hugging Face URL. The frontend's API target URL can be configured in the `src/services/auraScanService.ts` file.