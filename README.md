# TallAI — AI-Powered Accounting Software

## Prerequisites
1. Node.js 18+ — https://nodejs.org
2. Python 3.11+ — https://python.org
3. MySQL 8.0 — https://mysql.com/downloads
4. Google Gemini API key (FREE) — https://aistudio.google.com/app/apikey

## Setup (One Time)

### 1. Database
- Open MySQL Workbench or terminal
- Run: `CREATE DATABASE tallai;`

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
```
- Edit `.env`: replace `YOUR_MYSQL_PASSWORD` with your MySQL password
- Edit `.env`: replace `YOUR_GEMINI_API_KEY_HERE` with your Gemini API key
- **If MySQL is not configured yet**, the app automatically uses SQLite (`backend/tallai.db`) so you can run immediately
- Run seed data: `python seed_data.py`

### 3. Frontend
```bash
cd frontend
npm install
```

## Run the App
Double-click `start.bat` (Windows) or run `./start_mac.sh` (Mac/Linux)

Open browser: http://localhost:5173

Login: demo@tallai.com / demo123

## Features
- AI Chat: type any accounting command in Hindi or English
- Invoices: create, send, track, download PDF
- Expenses: track all business expenses
- Customers & Vendors: manage contacts
- GST: automated GST calculation and filing summary
- Reports: P&L, Balance Sheet, Trial Balance, Day Book
- Stock: inventory management with low stock alerts
- Ledger: complete double-entry bookkeeping
