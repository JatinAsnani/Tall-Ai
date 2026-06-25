# ANTIGRAVITY — CONTINUATION PROMPT
# Project: TallAI
# Status: ~66% built in Cursor. Switching tools. DO NOT rebuild from scratch.

---

## STEP 0 — READ BEFORE WRITING ANY CODE

This project already exists in this folder. It was partially built using another
AI tool (Cursor) against the spec below. Your first job is to **audit**, not build.

Do this first, in order:
1. Recursively list the full folder structure of `backend/` and `frontend/src/`.
2. Open and read every file that already exists. Note what's implemented,
   what's stubbed/placeholder, and what's missing entirely.
3. Compare against the COMPLETE FOLDER STRUCTURE and feature list below.
4. Produce a short status report before changing anything:
   - ✅ Fully working files/features
   - ⚠️ Partially implemented (has TODOs, placeholder logic, or fake data)
   - ❌ Missing files/features entirely
5. Only after I confirm the report (or you're instructed to proceed), start
   building — and only build what's ⚠️ or ❌. Do not touch or rewrite ✅ files
   unless you find an actual bug in them.

If `backend/.env` or `frontend/.env` already exist with real values (e.g. a
Gemini API key), DO NOT print their contents back to me in chat, DO NOT
overwrite them, and DO NOT include them in any commit, deploy, or shared
artifact. Treat existing `.env` files as already correct and leave them alone
unless a key is missing, in which case tell me what's missing — don't invent one.

---

## CRITICAL INSTRUCTION (same standard as before)

This is NOT a demo. Every remaining feature must be fully implemented with real
working code. No placeholder functions. No "TODO" comments. No fake data except
the seed file. Every button must work. Every form must save to the database.
Every AI command must execute a real database operation and return real results.

---

## WHAT THIS APP IS

TallAI is a full-featured accounting desktop application that replaces TallyPrime.
It runs locally (localhost) and opens in a browser. Two modes, same database:

MODE 1 — Traditional UI: forms, tables, menus.
MODE 2 — AI Chat: natural language commands (English/Hindi/Hinglish) that the AI
executes directly against the database via tool calls.

A user can create an invoice through a form OR by typing
"create invoice for Raj Traders 50 bags cement 380 rupees 18% GST" in chat —
same result, same database entry, same invoice number either way.

---

## TECH STACK — EXACT VERSIONS, NO SUBSTITUTIONS

Frontend: React 18 (Vite), Tailwind CSS v3, React Router DOM v6, Axios v1.7,
Recharts v2.12, React Hot Toast, date-fns, react-to-print.

Backend: Python 3.11+, FastAPI 0.111, Uvicorn, SQLAlchemy 2.0, PyMySQL,
python-jose (JWT), passlib + bcrypt, python-dotenv, APScheduler,
google-generativeai>=0.7.0 (Gemini API SDK), reportlab (PDF invoices),
openpyxl (Excel export), num2words.

Database: MySQL 8.0 local.
AI: Google Gemini API — model `gemini-1.5-flash` (free tier, 1500 req/day).
Env var name: `GEMINI_API_KEY`. AI client file: `ai/gemini_client.py`
(uses `genai.GenerativeModel`, `genai.configure`). Tool/function-calling schemas
live in `ai/tools_definition.py` using `genai.protos.FunctionDeclaration` and
`genai.protos.Tool` (NOT Claude's `input_schema` dict format — Gemini uses
`genai.protos.Schema` objects with `genai.protos.Type.OBJECT/STRING/NUMBER/etc`).
Chat flow uses `model.start_chat(history=...)` and checks
`response.parts[...].function_call` to detect tool calls, then sends the result
back via `genai.protos.FunctionResponse`.

If anything already in the codebase uses a different version or library, flag
it in your audit report rather than silently changing it.

---

## COMPLETE FOLDER STRUCTURE (target — compare existing folder against this)

```
tallai/
├── start.bat
├── start_mac.sh
├── README.md
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── deps.py
│   ├── seed_data.py
│   ├── requirements.txt
│   ├── .env
│   ├── routers/
│   │   ├── auth_router.py
│   │   ├── chat_router.py
│   │   ├── invoice_router.py
│   │   ├── expense_router.py
│   │   ├── customer_router.py
│   │   ├── vendor_router.py
│   │   ├── dashboard_router.py
│   │   ├── report_router.py
│   │   ├── ledger_router.py
│   │   ├── payment_router.py
│   │   └── stock_router.py
│   ├── ai/
│   │   ├── gemini_client.py
│   │   ├── system_prompt.py
│   │   ├── intent_router.py
│   │   ├── tools_definition.py
│   │   ├── invoice_ai.py
│   │   ├── payment_ai.py
│   │   ├── report_explainer.py
│   │   └── language_detector.py
│   └── features/
│       ├── gst_engine.py
│       ├── pl_report.py
│       ├── balance_sheet.py
│       ├── ledger_engine.py
│       ├── anomaly_detector.py
│       ├── reminder_scheduler.py
│       ├── chart_data.py
│       ├── invoice_pdf.py
│       └── excel_export.py
│
└── frontend/
    ├── index.html, vite.config.js, tailwind.config.js, postcss.config.js
    ├── package.json, .env
    └── src/
        ├── main.jsx, App.jsx
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── hooks/ (useInvoices.js, useCustomers.js, useDashboard.js)
        ├── utils/ (formatCurrency.js, formatDate.js, gstCalculator.js)
        ├── components/
        │   ├── layout/ (Sidebar.jsx, TopBar.jsx, PageWrapper.jsx)
        │   ├── ui/ (StatCard, Badge, Modal, ConfirmDialog, LoadingSkeleton,
        │   │        EmptyState, SearchBar)
        │   ├── chat/ (ChatBubble, SuggestionChips, TypingIndicator, ActionCard)
        │   └── forms/ (InvoiceForm, ExpenseForm, CustomerForm, PaymentForm)
        └── pages/ (Login, Register, Dashboard, Chat, Invoices, InvoiceDetail,
                     Expenses, Customers, CustomerDetail, Vendors, Payments,
                     Ledger, Stock, Reports, GST, Settings)
```

---

## DATABASE TABLES (verify these exist in models.py with correct columns)

users, customers, vendors, invoices, invoice_items, purchase_invoices,
purchase_items, payments, expenses, stock_items, ledger_entries, chat_history,
notifications.

Full column definitions are in the original spec file `cursor_prompt_tallai_v2.md`
in this project — this is the correct, Gemini-based version of the spec (an
earlier draft with Claude references should be disregarded/deleted if both
exist in the folder). Check each existing table against that file for missing
columns, wrong types, or missing foreign keys — don't assume the schema is
complete just because the table exists.

---

## BACKEND ROUTES TO VERIFY/COMPLETE

- **auth_router**: register, login, /auth/me, update profile
- **invoice_router**: create (auto invoice number INV-0001 format, GST split by
  place_of_supply, update customer outstanding, ledger entry), list with filters
  + pagination, get by id, update + recalculate, soft delete + reverse ledger,
  update status, PDF download (reportlab), record payment
- **purchase router**: create bill, list, get by id, update, record payment to vendor
- **expense_router**: create + ledger debit, list with filters, update, delete + reverse ledger
- **customer_router** / **vendor_router**: CRUD, search, outstanding filter,
  detail view with invoices + payment history
- **payment_router**: record payment received, update invoice + customer balances,
  ledger entry, list, outstanding report
- **dashboard_router**: /stats (sales, purchases, expenses, outstanding, net
  profit, GST due, low stock, overdue count), /recent
- **report_router**: P&L, GST summary, sales chart, expense breakdown,
  outstanding receivable/payable with aging, day book, balance sheet,
  trial balance, Excel exports
- **ledger_router**: all entries, by account with running balance, account list
- **stock_router**: add, list with low-stock flag, update, low-stock list, manual adjust

For each, check: does it exist? Does it return real DB data? Does it handle
errors and empty states? Is there any hardcoded/fake response standing in for
real logic?

---

## AI LAYER — MUST ACTUALLY EXECUTE ACTIONS, NOT JUST CHAT

- `system_prompt.py`: TallAI persona, Indian accounting knowledge (GST/CGST/SGST/
  IGST, double-entry, P&L, balance sheet, trial balance, day book, receivables,
  payables, stock). Detects Hindi/Hinglish vs English and replies in kind, no
  mid-conversation switching. Always confirms what action it took with real numbers.
- `tools_definition.py`: Gemini `FunctionDeclaration`/`Tool` schemas (genai.protos
  format, not Claude's dict format) for: create_invoice, record_payment,
  add_expense, check_outstanding, get_report, get_gst_summary, create_purchase,
  list_invoices, adjust_stock.
- `gemini_client.py`: configures `genai` with `GEMINI_API_KEY`, exposes a
  `get_model(tools=None, system_instruction=None)` helper and a
  `get_plain_model()` for plain-text replies (e.g. report explanations).
- Verify tool calls actually hit the database (via the same service functions the
  REST routes use) — not a separate mocked path. The chat and the UI must produce
  identical database results for equivalent actions.

Test phrase to verify end-to-end: **"Raj Traders ka outstanding kya hai?"**
should return a real number pulled from the database, in Hinglish.

---

## SEED DATA (backend/seed_data.py)

Demo user: business "Sharma General Store", GSTIN 24ABCDE1234F1Z5,
login demo@tallai.com / demo123. 8 customers, 5 vendors, 10 stock items,
30 sales invoices (mixed status) across last 3 months, 20 purchase bills,
25 expenses across categories, payment records for paid invoices, and all
resulting ledger entries.

Check if seed data already exists and is realistic — if it's thin or fake-looking,
flag it and offer to rebuild it.

---

## UI DESIGN SYSTEM (keep consistent with whatever Cursor already built)

Colors: sidebar #0f172a, sidebar text #94a3b8, sidebar active bg #1e293b/white
text, main bg #f8fafc, card bg #ffffff, primary #2563eb, success #16a34a,
warning #d97706, danger #dc2626, text primary #0f172a, text secondary #64748b,
border #e2e8f0. Font: Inter. Cards: `bg-white rounded-xl border border-gray-200 p-5`.
Buttons: `rounded-lg px-4 py-2 text-sm font-medium transition-colors`. Inputs:
`border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500`.

If the existing UI already matches this, keep matching it for any new
components you build — visual consistency matters more than re-deriving these
rules from scratch.

---

## ENVIRONMENT FILES — HANDLE WITH CARE

`backend/.env` should contain `DATABASE_URL`, `GEMINI_API_KEY`, `SECRET_KEY`,
`ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`. `frontend/.env` should contain
`VITE_API_BASE_URL`.

These files likely already exist with real values, including a real API key.
**Do not print their contents in chat, do not commit them, do not include them
in any file you create for sharing/export.** If you need to confirm a variable
exists, check for its presence only, not its value.

---

## FINAL VERIFICATION CHECKLIST (run through this once you believe it's done)

1. Every file in the target structure exists and has real logic, no TODOs.
2. Every CRUD operation works against the actual MySQL database.
3. AI chat executes real actions (not just describes them).
4. Invoice PDF download produces a correct, professional PDF.
5. GST, P&L, and outstanding calculations are mathematically correct — verify
   with at least one manual hand-calculated example.
6. Charts render real data from the database, not placeholder arrays.
7. Fresh-machine test passes: `pip install -r requirements.txt && npm install
   && python seed_data.py && start.bat`.
8. Full flow test: Register → Login → Create Customer → Create Invoice →
   Record Payment → Check P&L → Chat: "Raj Traders ka outstanding kya hai?"
9. Hindi/Hinglish detection works correctly in chat.
10. Every page has a graceful empty state when there's no data yet.

---

## YOUR FIRST RESPONSE TO ME SHOULD BE:

The audit report from Step 0 — what's done, what's partial, what's missing —
**not code**. Wait for my go-ahead (or my answer to any clarifying questions)
before generating files.
