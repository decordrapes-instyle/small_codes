# Decor Drapes Instyle - Web Projects

This repository contains a collection of web projects for Decor Drapes Instyle, a business specializing in premium blinds, curtains, and other interior decor solutions. The projects range from customer-facing catalogues and payment pages to internal admin tools.

## Projects Overview

This monorepo contains the following individual projects in their respective directories:

1.  **[Price - List](./Price%20-%20List/)**: A dynamic, interactive price list application for viewing and exporting product prices.
2.  **[Printed ERA Catalogue_Site](./Printed%20ERA%20Catalogue_Site/)**: A static digital catalogue for "ERA" printed roller fabrics.
3.  **[Social Page](./Social%20Page/)**: A simple, single-page "link-in-bio" style landing page.
4.  **[Payment](./Payment/)**: A dynamic UPI payment page for generating payment links and QR codes.
5.  **[Catalogue](./Catalogue/)**: An internal admin dashboard for managing URL redirects.

---

## 1. Price - List

**Location:** [`./Price - List/`](./Price%20-%20List/)

An application that provides a detailed view of product prices, organized by categories. It allows users to view product details and export price lists to PDF.

This project has two versions:
*   **Legacy Version** (in the root of `Price - List`): A single-page application built with **vanilla JavaScript** and **Firebase Realtime Database**.
*   **Next Version** (in `Price - List/next_ver`): A modern, feature-rich version built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It includes features like custom measurement calculations and sharing capabilities.

### Key Technologies (`next_ver`):
- React
- Vite
- TypeScript
- Firebase
- Tailwind CSS
- `html2canvas` for image generation

---

## 2. Printed ERA Catalogue Site

**Location:** [`./Printed ERA Catalogue_Site/`](./Printed%20ERA%20Catalogue_Site/)

A static website that serves as a digital catalogue for a specific collection of printed roller fabrics ("ERA"). It features a searchable and paginated gallery of fabric images.

### Features:
- Search and filter fabric codes.
- Image zoom modal.
- Share fabric details (with custom measurements) to WhatsApp or email.

### Key Technologies:
- HTML, CSS, Vanilla JavaScript
- Tailwind CSS
- Lazy loading for images

---

## 3. Social Page

**Location:** [`./Social Page/`](./Social%20Page/)

A "link-in-bio" style landing page designed to be a central hub for all of the company's social media and contact links. It also features a card that dynamically displays the company's Google Reviews.

### How it Works:
- The page is a static HTML file.
- A **Netlify serverless function** (`/functions/fetch.js`) is used to fetch Google Reviews data from an external API, which is then displayed on the page.

### Key Technologies:
- HTML, CSS, Vanilla JavaScript
- Netlify Functions

---

## 4. Payment Page

**Location:** [`./Payment/`](./Payment/)

A simple web application to facilitate UPI payments. It generates a dynamic UPI payment link and QR code based on URL parameters (`customer`, `quote`, `amount`).

### How it Works:
- The `pay.html` page takes customer and amount details from the URL.
- On mobile devices, it attempts to directly open a UPI payment app.
- On desktop, it displays a QR code for the user to scan.

### Key Technologies:
- HTML, CSS, Vanilla JavaScript
- Tailwind CSS
- `qrcode.js` for QR code generation

---

## 5. Catalogue Admin

**Location:** [`./Catalogue/`](./Catalogue/)

An internal admin dashboard for managing URL redirects. This tool allows an administrator to create, update, and delete short slugs that redirect to longer destination URLs, and it also generates QR codes for each redirect.

### Features:
- Secure login for admin users.
- CRUD (Create, Read, Update, Delete) operations for URL redirects.
- QR code generation for each link.

### Key Technologies:
- HTML, CSS, Vanilla JavaScript
- Firebase (for Authentication and Realtime Database)
- Tailwind CSS
