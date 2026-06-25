# CURSOR AI — COMPLETE PRODUCTION PROMPT
# Application: TallAI
# Type: Desktop application (runs on localhost, opens in browser)
# Goal: Fully working accounting software — not a demo, not placeholder code
# Every function must work end-to-end. Real database. Real AI. Real calculations.

---

## CRITICAL INSTRUCTION FOR CURSOR AI

This is NOT a demo. This is NOT a prototype. Every single feature must be fully
implemented with real working code. No placeholder functions. No "TODO" comments.
No fake data except the seed file. Every button must work. Every form must save to
the database. Every AI command must execute a real database operation and return
real results. If a user types "deduct 5000 from Raj Traders" — the app must actually
create a debit transaction, update the customer's outstanding balance, and confirm it.

---

## WHAT THIS APP IS

TallAI is a full-featured accounting desktop application that replaces TallyPrime.
It runs locally on a Windows laptop (localhost). Users are accountants, shopkeepers,
and small business owners who know accounting basics. The app has two modes:

MODE 1 — Traditional UI: Click through menus, forms, and tables like any accounting software.
MODE 2 — AI Chat: Type or speak natural language commands. The AI executes them automatically.

Both modes work on the same database. A user can create an invoice through the form
OR by typing "create invoice for Raj Traders 50 bags cement 380 rupees 18% GST" in chat.
Same result, same database entry, same invoice number.

---

## TECH STACK — EXACT VERSIONS, NO SUBSTITUTIONS

Frontend:
  - React 18 via Vite
  - Tailwind CSS v3
  - React Router DOM v6
  - Axios v1.7
  - Recharts v2.12
  - React Hot Toast (notifications)
  - date-fns (date formatting)
  - react-to-print (print/PDF invoices)

Backend:
  - Python 3.11+
  - FastAPI 0.111
  - Uvicorn
  - SQLAlchemy 2.0
  - PyMySQL
  - python-jose (JWT)
  - passlib + bcrypt
  - python-dotenv
  - APScheduler
  - google-generativeai>=0.7.0 (Gemini API SDK)
  - reportlab (generate PDF invoices)
  - openpyxl (export reports to Excel)

Database: MySQL 8.0 local

AI: Google Gemini API — model gemini-1.5-flash (free tier, 1500 req/day)

---

## COMPLETE FOLDER STRUCTURE

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
│   │
│   ├── routers/
│   │   ├── __init__.py
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
│   │
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── gemini_client.py
│   │   ├── system_prompt.py
│   │   ├── intent_router.py
│   │   ├── tools_definition.py
│   │   ├── invoice_ai.py
│   │   ├── payment_ai.py
│   │   ├── report_explainer.py
│   │   └── language_detector.py
│   │
│   └── features/
│       ├── __init__.py
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
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── .env
    │
    └── src/
        ├── main.jsx
        ├── App.jsx
        │
        ├── api/
        │   └── axios.js
        │
        ├── context/
        │   └── AuthContext.jsx
        │
        ├── hooks/
        │   ├── useInvoices.js
        │   ├── useCustomers.js
        │   └── useDashboard.js
        │
        ├── utils/
        │   ├── formatCurrency.js
        │   ├── formatDate.js
        │   └── gstCalculator.js
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Sidebar.jsx
        │   │   ├── TopBar.jsx
        │   │   └── PageWrapper.jsx
        │   ├── ui/
        │   │   ├── StatCard.jsx
        │   │   ├── Badge.jsx
        │   │   ├── Modal.jsx
        │   │   ├── ConfirmDialog.jsx
        │   │   ├── LoadingSkeleton.jsx
        │   │   ├── EmptyState.jsx
        │   │   └── SearchBar.jsx
        │   ├── chat/
        │   │   ├── ChatBubble.jsx
        │   │   ├── SuggestionChips.jsx
        │   │   ├── TypingIndicator.jsx
        │   │   └── ActionCard.jsx
        │   └── forms/
        │       ├── InvoiceForm.jsx
        │       ├── ExpenseForm.jsx
        │       ├── CustomerForm.jsx
        │       └── PaymentForm.jsx
        │
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            ├── Dashboard.jsx
            ├── Chat.jsx
            ├── Invoices.jsx
            ├── InvoiceDetail.jsx
            ├── Expenses.jsx
            ├── Customers.jsx
            ├── CustomerDetail.jsx
            ├── Vendors.jsx
            ├── Payments.jsx
            ├── Ledger.jsx
            ├── Stock.jsx
            ├── Reports.jsx
            ├── GST.jsx
            └── Settings.jsx
```

---

## DATABASE — ALL TABLES (implement fully in models.py)

### users
```sql
id                INT PK AUTO_INCREMENT
name              VARCHAR(100) NOT NULL
email             VARCHAR(150) UNIQUE NOT NULL
password_hash     VARCHAR(255) NOT NULL
business_name     VARCHAR(200)
business_address  TEXT
gstin             VARCHAR(20)
phone             VARCHAR(20)
financial_year    VARCHAR(10) DEFAULT '2024-25'
currency          VARCHAR(5) DEFAULT 'INR'
created_at        DATETIME DEFAULT NOW()
```

### customers
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
name            VARCHAR(150) NOT NULL
phone           VARCHAR(20)
email           VARCHAR(150)
gstin           VARCHAR(20)
address         TEXT
city            VARCHAR(100)
state           VARCHAR(100)
pincode         VARCHAR(10)
credit_limit    DECIMAL(12,2) DEFAULT 0
outstanding     DECIMAL(12,2) DEFAULT 0
total_business  DECIMAL(12,2) DEFAULT 0
created_at      DATETIME DEFAULT NOW()
```

### vendors
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
name            VARCHAR(150) NOT NULL
phone           VARCHAR(20)
email           VARCHAR(150)
gstin           VARCHAR(20)
address         TEXT
city            VARCHAR(100)
state           VARCHAR(100)
outstanding     DECIMAL(12,2) DEFAULT 0
created_at      DATETIME DEFAULT NOW()
```

### invoices (sales invoices)
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
customer_id     INT FK customers.id
invoice_number  VARCHAR(50) UNIQUE NOT NULL
invoice_date    DATE NOT NULL
due_date        DATE
place_of_supply VARCHAR(100)
subtotal        DECIMAL(12,2) NOT NULL
discount        DECIMAL(12,2) DEFAULT 0
taxable_amount  DECIMAL(12,2) NOT NULL
cgst_amount     DECIMAL(12,2) DEFAULT 0
sgst_amount     DECIMAL(12,2) DEFAULT 0
igst_amount     DECIMAL(12,2) DEFAULT 0
total_gst       DECIMAL(12,2) DEFAULT 0
total_amount    DECIMAL(12,2) NOT NULL
paid_amount     DECIMAL(12,2) DEFAULT 0
balance_due     DECIMAL(12,2) NOT NULL
status          ENUM('draft','sent','paid','partial','overdue') DEFAULT 'draft'
payment_terms   VARCHAR(100)
notes           TEXT
created_at      DATETIME DEFAULT NOW()
```

### invoice_items
```sql
id              INT PK AUTO_INCREMENT
invoice_id      INT FK invoices.id
item_name       VARCHAR(255) NOT NULL
hsn_code        VARCHAR(20)
quantity        DECIMAL(10,3) NOT NULL
unit            VARCHAR(20) DEFAULT 'pcs'
unit_price      DECIMAL(12,2) NOT NULL
discount_pct    DECIMAL(5,2) DEFAULT 0
taxable_amount  DECIMAL(12,2) NOT NULL
gst_rate        DECIMAL(5,2) DEFAULT 18
gst_amount      DECIMAL(12,2) DEFAULT 0
total_amount    DECIMAL(12,2) NOT NULL
```

### purchase_invoices (bills from vendors)
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
vendor_id       INT FK vendors.id
bill_number     VARCHAR(50)
bill_date       DATE NOT NULL
due_date        DATE
subtotal        DECIMAL(12,2)
total_gst       DECIMAL(12,2) DEFAULT 0
total_amount    DECIMAL(12,2) NOT NULL
paid_amount     DECIMAL(12,2) DEFAULT 0
balance_due     DECIMAL(12,2) NOT NULL
status          ENUM('pending','paid','partial') DEFAULT 'pending'
notes           TEXT
created_at      DATETIME DEFAULT NOW()
```

### purchase_items
```sql
id              INT PK AUTO_INCREMENT
purchase_id     INT FK purchase_invoices.id
item_name       VARCHAR(255)
quantity        DECIMAL(10,3)
unit_price      DECIMAL(12,2)
gst_rate        DECIMAL(5,2) DEFAULT 18
gst_amount      DECIMAL(12,2)
total_amount    DECIMAL(12,2)
```

### payments (money received from customers)
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
customer_id     INT FK customers.id
invoice_id      INT FK invoices.id NULLABLE
amount          DECIMAL(12,2) NOT NULL
payment_date    DATE NOT NULL
payment_mode    ENUM('cash','bank_transfer','upi','cheque','card') DEFAULT 'cash'
reference_no    VARCHAR(100)
notes           TEXT
created_at      DATETIME DEFAULT NOW()
```

### expenses
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
vendor_id       INT FK vendors.id NULLABLE
category        VARCHAR(100) NOT NULL
sub_category    VARCHAR(100)
description     VARCHAR(255)
amount          DECIMAL(12,2) NOT NULL
gst_paid        DECIMAL(12,2) DEFAULT 0
expense_date    DATE NOT NULL
payment_mode    ENUM('cash','bank_transfer','upi','cheque','card') DEFAULT 'cash'
reference_no    VARCHAR(100)
receipt_note    TEXT
created_at      DATETIME DEFAULT NOW()
```

### stock_items
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
name            VARCHAR(150) NOT NULL
sku             VARCHAR(50)
category        VARCHAR(100)
unit            VARCHAR(20) DEFAULT 'pcs'
current_stock   DECIMAL(10,3) DEFAULT 0
min_stock       DECIMAL(10,3) DEFAULT 0
purchase_rate   DECIMAL(12,2) DEFAULT 0
selling_rate    DECIMAL(12,2) DEFAULT 0
gst_rate        DECIMAL(5,2) DEFAULT 18
hsn_code        VARCHAR(20)
created_at      DATETIME DEFAULT NOW()
```

### ledger_entries
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
account_name    VARCHAR(150) NOT NULL
account_type    ENUM('asset','liability','income','expense','equity')
debit           DECIMAL(12,2) DEFAULT 0
credit          DECIMAL(12,2) DEFAULT 0
balance         DECIMAL(12,2) DEFAULT 0
description     VARCHAR(255)
reference_type  VARCHAR(50)
reference_id    INT
entry_date      DATE NOT NULL
created_at      DATETIME DEFAULT NOW()
```

### chat_history
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
role            ENUM('user','assistant')
message         TEXT
action_taken    VARCHAR(100)
created_at      DATETIME DEFAULT NOW()
```

### notifications
```sql
id              INT PK AUTO_INCREMENT
user_id         INT FK users.id
type            VARCHAR(50)
message         TEXT
is_read         BOOLEAN DEFAULT FALSE
created_at      DATETIME DEFAULT NOW()
```

---

## BACKEND — FULLY IMPLEMENTED ROUTES

### main.py
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models
from routers import (auth_router, chat_router, invoice_router, expense_router,
                     customer_router, vendor_router, dashboard_router,
                     report_router, ledger_router, payment_router, stock_router)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TallAI API", version="1.0.0")

app.add_middleware(CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
app.include_router(chat_router.router, prefix="/chat", tags=["Chat"])
app.include_router(invoice_router.router, prefix="/invoices", tags=["Invoices"])
app.include_router(expense_router.router, prefix="/expenses", tags=["Expenses"])
app.include_router(customer_router.router, prefix="/customers", tags=["Customers"])
app.include_router(vendor_router.router, prefix="/vendors", tags=["Vendors"])
app.include_router(dashboard_router.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(report_router.router, prefix="/reports", tags=["Reports"])
app.include_router(ledger_router.router, prefix="/ledger", tags=["Ledger"])
app.include_router(payment_router.router, prefix="/payments", tags=["Payments"])
app.include_router(stock_router.router, prefix="/stock", tags=["Stock"])
```

### AUTH ROUTER — fully implement:
- POST /auth/register → hash password, create user, return JWT + user info
- POST /auth/login → verify password, return JWT + user info
- GET /auth/me → return current user from JWT
- PUT /auth/profile → update business name, GSTIN, address, phone

### INVOICE ROUTER — fully implement all of these:
- POST /invoices → create invoice with items, auto-generate invoice number (INV-0001 format),
  calculate CGST+SGST or IGST based on place_of_supply, update customer outstanding,
  create ledger entry, return full invoice object
- GET /invoices → list with filters: status, customer_id, from_date, to_date, search
  pagination: page, limit. Return total count for pagination.
- GET /invoices/{id} → full invoice with items and customer details
- PUT /invoices/{id} → update invoice, recalculate totals, update ledger
- DELETE /invoices/{id} → soft delete, reverse ledger entry, update customer outstanding
- PUT /invoices/{id}/status → update status, if paid: create payment record
- GET /invoices/{id}/pdf → generate PDF using reportlab, return as file response
- POST /invoices/{id}/payment → record partial or full payment, update balance_due,
  update status to partial or paid, update customer outstanding

### PURCHASE INVOICE ROUTER — fully implement:
- POST /purchases → create purchase bill, update vendor outstanding, create ledger entry
- GET /purchases → list all purchase bills
- GET /purchases/{id} → full purchase with items
- PUT /purchases/{id} → update
- POST /purchases/{id}/payment → record payment to vendor

### EXPENSE ROUTER — fully implement:
- POST /expenses → create expense, create ledger debit entry
- GET /expenses → list with filters: category, from_date, to_date
- PUT /expenses/{id} → update
- DELETE /expenses/{id} → delete, reverse ledger

### CUSTOMER ROUTER — fully implement:
- POST /customers → create customer
- GET /customers → list with search, outstanding filter
- GET /customers/{id} → customer + all invoices + payment history + outstanding
- PUT /customers/{id} → update customer
- DELETE /customers/{id} → only if no invoices

### VENDOR ROUTER — same pattern as customer router

### PAYMENT ROUTER — fully implement:
- POST /payments → record payment received, update invoice balance_due,
  update invoice status, update customer outstanding, create ledger entry
- GET /payments → list all payments received
- GET /payments/outstanding → list all customers with balance_due > 0

### DASHBOARD ROUTER — fully implement:
- GET /dashboard/stats → return:
  {
    total_sales_this_month, total_purchases_this_month,
    total_expenses_this_month, outstanding_receivable,
    outstanding_payable, net_profit_this_month,
    invoice_count_today, gst_due_days, gst_liability,
    low_stock_count, overdue_invoices_count
  }
- GET /dashboard/recent → last 5 invoices + last 5 expenses + top 3 customers

### REPORT ROUTER — fully implement:
- GET /reports/pl?from_date&to_date →
  { total_sales, total_purchases, gross_profit, total_expenses, net_profit, profit_margin }
- GET /reports/gst-summary?month&year →
  { total_taxable_sales, cgst_collected, sgst_collected, igst_collected,
    total_gst_collected, total_gst_paid_on_purchases, net_gst_liability }
- GET /reports/sales-chart?months=6 → monthly sales array for bar chart
- GET /reports/expense-breakdown?month&year → by category for pie chart
- GET /reports/outstanding-receivable → customer-wise with aging (0-30, 31-60, 60+ days)
- GET /reports/outstanding-payable → vendor-wise outstanding
- GET /reports/daybook?date → all transactions for a single day
- GET /reports/balance-sheet → assets, liabilities, equity summary
- GET /reports/trial-balance → all ledger accounts with debit/credit totals
- GET /reports/export/pl → download as Excel using openpyxl
- GET /reports/export/gst → download GST summary as Excel

### LEDGER ROUTER — fully implement:
- GET /ledger → all ledger entries with filters
- GET /ledger/account/{account_name} → all entries for one account with running balance
- GET /ledger/accounts → list all unique account names with current balance

### STOCK ROUTER — fully implement:
- POST /stock → add stock item
- GET /stock → list all items, include low_stock flag if current < min
- PUT /stock/{id} → update item details or stock quantity
- GET /stock/low → items below minimum stock level
- POST /stock/{id}/adjust → manual stock adjustment (add or deduct)

---

## AI LAYER — FULLY WORKING, NOT DEMO

### system_prompt.py — write this complete system prompt:

```
You are TallAI, an intelligent accounting assistant for Indian small businesses.
You are embedded in a professional accounting application. You have access to tools
that let you directly create invoices, record payments, add expenses, check balances,
and generate reports. When a user gives you an accounting instruction, you MUST use
the appropriate tool to execute it — not just describe what to do.

You understand all Indian accounting concepts:
- Sales invoices, purchase bills, credit notes, debit notes
- GST: CGST, SGST, IGST, input tax credit, GSTR-1, GSTR-3B
- Double entry bookkeeping: every transaction has a debit and credit entry
- P&L statement, balance sheet, trial balance, day book
- Accounts receivable (customers who owe money)
- Accounts payable (vendors we owe money to)
- Stock/inventory management

LANGUAGE RULE: Detect if the user is writing in Hindi or Hinglish (Hindi + English mix).
If yes, reply in Hinglish. If English, reply in English. Never switch mid-conversation.

EXECUTION RULE: When user says things like:
- "deduct 5000 from Raj Traders" → use record_payment tool
- "Raj Traders ne 10000 diya" → use record_payment tool
- "cement ke 50 bags ka invoice banao Raj Traders ke liye" → use create_invoice tool
- "aaj ka expense 2000 rent" → use add_expense tool
- "Mehta ka kitna baaki hai?" → use check_outstanding tool
- "show me this month sales" → use get_report tool
- "pichle mahine ka GST kitna tha?" → use get_gst_summary tool

Always confirm what you did: "Done! Invoice #INV-0047 created for Raj Traders, 
total ₹22,420. Confirm karna hai?"

Never make up numbers. Always fetch real data from the database via tools.
When creating invoices, always show a preview and ask for confirmation before saving.
When recording payments or deductions, confirm the amount and customer first.
```

### tools_definition.py — define ALL tools for Gemini function calling:

```python
# Gemini requires tools as genai.protos.Tool with FunctionDeclaration objects.
# Define all functions here and wrap them into GEMINI_TOOLS below.

import google.generativeai as genai

_function_declarations = [
    genai.protos.FunctionDeclaration(
        name="create_invoice",
        description="Create a sales invoice. Use when user wants to make a bill or invoice for a customer.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "customer_name": genai.protos.Schema(type=genai.protos.Type.STRING, description="Customer name"),
                "items": genai.protos.Schema(
                    type=genai.protos.Type.ARRAY,
                    items=genai.protos.Schema(
                        type=genai.protos.Type.OBJECT,
                        properties={
                            "name": genai.protos.Schema(type=genai.protos.Type.STRING),
                            "quantity": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                            "unit": genai.protos.Schema(type=genai.protos.Type.STRING),
                            "unit_price": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                            "gst_rate": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                        },
                        required=["name", "quantity", "unit_price"]
                    )
                ),
                "invoice_date": genai.protos.Schema(type=genai.protos.Type.STRING, description="Date in YYYY-MM-DD format, default today"),
                "notes": genai.protos.Schema(type=genai.protos.Type.STRING),
            },
            required=["customer_name", "items"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="record_payment",
        description="Record payment received from a customer. Use when customer has paid or partially paid.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "customer_name": genai.protos.Schema(type=genai.protos.Type.STRING),
                "amount": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                "payment_mode": genai.protos.Schema(type=genai.protos.Type.STRING, description="cash, bank_transfer, upi, cheque, or card"),
                "invoice_id": genai.protos.Schema(type=genai.protos.Type.INTEGER, description="Optional: specific invoice this payment is for"),
                "notes": genai.protos.Schema(type=genai.protos.Type.STRING),
            },
            required=["customer_name", "amount"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="add_expense",
        description="Record a business expense.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "category": genai.protos.Schema(type=genai.protos.Type.STRING, description="e.g. Rent, Salary, Utilities, Transport"),
                "amount": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                "description": genai.protos.Schema(type=genai.protos.Type.STRING),
                "vendor_name": genai.protos.Schema(type=genai.protos.Type.STRING),
                "payment_mode": genai.protos.Schema(type=genai.protos.Type.STRING),
                "expense_date": genai.protos.Schema(type=genai.protos.Type.STRING),
            },
            required=["category", "amount"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="check_outstanding",
        description="Check how much a customer owes or how much we owe a vendor.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "party_name": genai.protos.Schema(type=genai.protos.Type.STRING, description="Customer or vendor name"),
                "party_type": genai.protos.Schema(type=genai.protos.Type.STRING, description="customer or vendor"),
            },
            required=["party_name"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="get_report",
        description="Get financial report data — sales, expenses, profit/loss.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "report_type": genai.protos.Schema(type=genai.protos.Type.STRING, description="sales, expenses, pl, daybook, or outstanding"),
                "from_date": genai.protos.Schema(type=genai.protos.Type.STRING),
                "to_date": genai.protos.Schema(type=genai.protos.Type.STRING),
                "period": genai.protos.Schema(type=genai.protos.Type.STRING, description="today, this_week, this_month, last_month, or this_year"),
            },
            required=["report_type"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="get_gst_summary",
        description="Get GST summary for a month.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "month": genai.protos.Schema(type=genai.protos.Type.INTEGER),
                "year": genai.protos.Schema(type=genai.protos.Type.INTEGER),
            }
        )
    ),
    genai.protos.FunctionDeclaration(
        name="create_purchase",
        description="Record a purchase bill from a vendor.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "vendor_name": genai.protos.Schema(type=genai.protos.Type.STRING),
                "items": genai.protos.Schema(type=genai.protos.Type.ARRAY, items=genai.protos.Schema(type=genai.protos.Type.OBJECT)),
                "bill_number": genai.protos.Schema(type=genai.protos.Type.STRING),
                "bill_date": genai.protos.Schema(type=genai.protos.Type.STRING),
            },
            required=["vendor_name", "items"]
        )
    ),
    genai.protos.FunctionDeclaration(
        name="list_invoices",
        description="List invoices with optional filters.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "customer_name": genai.protos.Schema(type=genai.protos.Type.STRING),
                "status": genai.protos.Schema(type=genai.protos.Type.STRING),
                "period": genai.protos.Schema(type=genai.protos.Type.STRING),
            }
        )
    ),
    genai.protos.FunctionDeclaration(
        name="adjust_stock",
        description="Add or deduct stock quantity.",
        parameters=genai.protos.Schema(
            type=genai.protos.Type.OBJECT,
            properties={
                "item_name": genai.protos.Schema(type=genai.protos.Type.STRING),
                "quantity": genai.protos.Schema(type=genai.protos.Type.NUMBER),
                "action": genai.protos.Schema(type=genai.protos.Type.STRING, description="add or deduct"),
                "reason": genai.protos.Schema(type=genai.protos.Type.STRING),
            },
            required=["item_name", "quantity", "action"]
        )
    ),
]

GEMINI_TOOLS = genai.protos.Tool(function_declarations=_function_declarations)
```

### gemini_client.py — fully implement:

```python
# ai/gemini_client.py
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def get_model(tools=None, system_instruction=None):
    return genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        tools=tools,
        system_instruction=system_instruction
    )

def get_plain_model():
    """Model without tools — for plain text replies and report explanations."""
    return genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction="You are TallAI, an accounting assistant. Reply in the same language the user used (Hindi or English)."
    )
```

### intent_router.py — fully working tool execution:

```python
import google.generativeai as genai
import os
import json
from ai.system_prompt import SYSTEM_PROMPT
from ai.tools_definition import GEMINI_TOOLS

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    tools=GEMINI_TOOLS,
    system_instruction=SYSTEM_PROMPT
)

async def process_chat_message(user_message: str, chat_history: list, user_id: int, db) -> dict:
    # Build Gemini-format history
    gemini_history = []
    for msg in chat_history:
        role = "user" if msg["role"] == "user" else "model"
        gemini_history.append({"role": role, "parts": [msg["content"]]})

    chat = model.start_chat(history=gemini_history)
    response = chat.send_message(user_message)

    # If Gemini wants to use a tool (function call)
    for part in response.parts:
        if hasattr(part, "function_call") and part.function_call.name:
            tool_name = part.function_call.name
            tool_input = dict(part.function_call.args)

            # Execute the tool (real database operation)
            tool_result = await execute_tool(tool_name, tool_input, user_id, db)

            # Send the function result back to Gemini for final response
            function_response = chat.send_message(
                genai.protos.Content(parts=[
                    genai.protos.Part(
                        function_response=genai.protos.FunctionResponse(
                            name=tool_name,
                            response={"result": tool_result}
                        )
                    )
                ])
            )

            final_text = function_response.text if hasattr(function_response, "text") else ""
            return {
                "reply": final_text,
                "action": tool_name,
                "data": tool_result
            }

    # Plain text response (no tool call)
    text = response.text if hasattr(response, "text") else ""
    return {"reply": text, "action": None, "data": None}


async def execute_tool(tool_name: str, tool_input: dict, user_id: int, db) -> dict:
    # Import all necessary CRUD functions from routers
    from features import gst_engine, pl_report, chart_data
    from routers import invoice_router, expense_router, payment_router, customer_router
    
    if tool_name == "create_invoice":
        return await invoice_router.create_invoice_from_ai(tool_input, user_id, db)
    
    elif tool_name == "record_payment":
        return await payment_router.record_payment_from_ai(tool_input, user_id, db)
    
    elif tool_name == "add_expense":
        return await expense_router.add_expense_from_ai(tool_input, user_id, db)
    
    elif tool_name == "check_outstanding":
        return await customer_router.get_outstanding_from_ai(tool_input, user_id, db)
    
    elif tool_name == "get_report":
        return await pl_report.get_report_for_ai(tool_input, user_id, db)
    
    elif tool_name == "get_gst_summary":
        return await gst_engine.get_summary_for_ai(tool_input, user_id, db)
    
    elif tool_name == "list_invoices":
        return await invoice_router.list_invoices_for_ai(tool_input, user_id, db)
    
    return {"error": "Unknown tool"}
```

---

## FRONTEND — FULLY WORKING PAGES

### axios.js — with interceptors:
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('tallai_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('tallai_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
```

### Chat.jsx — fully working AI chat:
The Chat page is the most important page. Implement completely:
- Left panel: quick actions (New Invoice, Record Payment, Check Outstanding, Today's Sales,
  Add Expense, GST Summary) — clicking any runs that query in chat
- Main chat area: full message thread with user and AI bubbles
- When AI returns action="create_invoice" with data: render InvoicePreviewCard inline in chat
  with Confirm and Edit buttons. Confirm button calls POST /invoices with the data.
- When AI returns action="record_payment": show PaymentConfirmCard with amount, customer, mode
- When AI returns action="get_report" with data: render a small ReportCard with numbers
- Suggestion chips appear after every AI reply: 3 relevant follow-up options
- Voice input: use window.SpeechRecognition Web API (no library needed)
  ```javascript
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
  recognition.lang = 'hi-IN' // supports Hindi
  recognition.onresult = (e) => setInput(e.results[0][0].transcript)
  recognition.start()
  ```
- Chat history persists: load from GET /chat/history on mount, save each message
- Typing indicator while waiting for AI response (animated dots)

### InvoiceForm.jsx — fully working:
- Multi-line items table: each row has Item Name, Qty, Unit, Rate, GST%, Amount
- Add/remove rows dynamically
- Auto-calculate: subtotal per row, total subtotal, GST amount, grand total — live as user types
- Customer dropdown: search and select from existing customers, or type new name
- Auto-fill customer GSTIN if exists in DB
- CGST+SGST if same state, IGST if different state (based on place_of_supply vs business state)
- Date pickers for invoice date and due date
- Preview button: shows print-ready invoice preview
- Save as Draft vs Save & Send options

### Invoices.jsx — fully working:
- Table with columns: Invoice #, Customer, Date, Due Date, Amount, GST, Total, Status, Actions
- Status badges with colors: Draft=gray, Sent=blue, Paid=green, Partial=yellow, Overdue=red
- Actions per row: View, Edit, Download PDF, Mark as Paid, Delete
- Filter bar: Status dropdown, Date range picker, Customer search
- Pagination: 20 per page
- Bulk actions: select multiple → mark as sent, delete
- Summary bar at top: Total invoiced, Total received, Total outstanding (for filtered view)

### Dashboard.jsx — fully working:
- Real data from GET /dashboard/stats and GET /dashboard/recent
- Top row: 4 stat cards with real numbers and percentage change vs last month
- Bar chart: last 6 months sales vs expenses (Recharts BarChart)
- Pie chart: expense breakdown by category (Recharts PieChart)
- Recent invoices list: clickable, goes to invoice detail
- GST countdown banner if due < 7 days
- Low stock alert if any items below minimum
- Overdue invoices alert with count and total amount

### Reports.jsx — fully working:
- Tab navigation: P&L | GST | Sales | Expenses | Outstanding | Day Book | Balance Sheet
- Each tab has date range filters (from_date, to_date or month/year picker)
- P&L tab: income statement layout with all numbers from DB
- GST tab: GSTR-1 summary table + GSTR-3B breakdown
- Outstanding tab: customer-wise aging report (current, 30 days, 60 days, 90+ days)
- Day Book tab: all transactions for selected date, categorized
- Each tab: Export to Excel button, Print button
- "Explain with AI" button on each report tab: calls AI to explain the numbers in plain language

### GST.jsx — fully working:
- Two cards: GSTR-1 (Sales Return) and GSTR-3B (Tax Payment Summary)
- Filing deadline countdown: large number, changes color as deadline approaches
- GST summary table: Rate | Taxable Amount | CGST | SGST | IGST | Total
- Tax liability calculator: GST collected − ITC = Net payable
- Month selector to view any past month
- "Prepare for Filing" button: AI summarizes what needs to be filed

### Customers.jsx — fully working:
- Table: Name, Phone, GSTIN, Total Business, Outstanding, Last Invoice Date
- Sort by outstanding amount
- Click customer: opens CustomerDetail page
- CustomerDetail: complete profile + all invoices + payment history + outstanding amount
- Add/Edit customer form modal
- "Send Reminder" button: AI drafts a payment reminder message

### Ledger.jsx — fully working:
- Account list on left: all ledger accounts (Sales, Purchases, Cash, Bank, each Customer, each Vendor)
- Click account: shows all entries with running balance on right
- Traditional ledger format: Date | Particulars | Debit | Credit | Balance
- Filter by date range
- Trial Balance view: all accounts in one table with total debit = total credit

### Stock.jsx — fully working:
- Items table: Name, Category, Current Stock, Min Stock, Purchase Rate, Selling Rate
- Stock status badge: OK (green), Low (yellow), Out of Stock (red)
- Add/Edit stock item form
- Stock adjustment modal: add or deduct with reason
- Low stock alert list

---

## INVOICE PDF GENERATION — backend/features/invoice_pdf.py

Using reportlab, generate professional invoice PDF:
- Company name and logo placeholder at top
- Customer details and billing address
- Invoice number, date, due date
- Items table with: Item, HSN, Qty, Unit, Rate, GST%, Amount
- Subtotal, discount, taxable amount, CGST, SGST/IGST, Grand Total
- Amount in words (e.g. "Twenty Two Thousand Four Hundred Twenty Rupees Only")
- Payment terms and notes at bottom
- "Thank you for your business" footer

```python
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import mm
import io
from num2words import num2words

def generate_invoice_pdf(invoice_data: dict, business_info: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                             topMargin=15*mm, bottomMargin=15*mm,
                             leftMargin=15*mm, rightMargin=15*mm)
    # Build full PDF with all invoice sections
    # Return buffer.getvalue() as bytes
```

Install: pip install reportlab num2words

---

## GST ENGINE — backend/features/gst_engine.py

```python
def calculate_gst(amount: float, rate: float, same_state: bool = True) -> dict:
    gst_amount = round(amount * rate / 100, 2)
    if same_state:
        return {
            "cgst_rate": rate / 2,
            "sgst_rate": rate / 2,
            "cgst_amount": round(gst_amount / 2, 2),
            "sgst_amount": round(gst_amount / 2, 2),
            "igst_rate": 0,
            "igst_amount": 0,
            "total_gst": gst_amount
        }
    else:
        return {
            "cgst_rate": 0, "sgst_rate": 0,
            "cgst_amount": 0, "sgst_amount": 0,
            "igst_rate": rate, "igst_amount": gst_amount,
            "total_gst": gst_amount
        }

def get_next_deadlines() -> dict:
    from datetime import date, timedelta
    today = date.today()
    month = today.month
    year = today.year
    
    gstr1_day = 11  # 11th of next month
    gstr3b_day = 20  # 20th of next month
    
    if today.month == 12:
        next_month, next_year = 1, year + 1
    else:
        next_month, next_year = month + 1, year
    
    gstr1_due = date(next_year, next_month, gstr1_day)
    gstr3b_due = date(next_year, next_month, gstr3b_day)
    
    return {
        "gstr1_due": gstr1_due.isoformat(),
        "gstr1_days_left": (gstr1_due - today).days,
        "gstr3b_due": gstr3b_due.isoformat(),
        "gstr3b_days_left": (gstr3b_due - today).days
    }
```

---

## ANOMALY DETECTION — backend/features/anomaly_detector.py

```python
import statistics

def detect_anomalies(user_id: int, db) -> list:
    anomalies = []
    
    # 1. Duplicate invoice amounts same day same customer
    # Query invoices, group by (customer_id, invoice_date, total_amount)
    # If count > 1, flag as duplicate
    
    # 2. Expense spike detection
    # For each category, calculate mean and std dev of last 30 days
    # Flag any expense > mean + 2*std_dev
    
    # 3. Sales drop detection
    # Compare this week's sales to same week last month
    # Flag if drop > 40%
    
    # 4. Overdue invoices older than 60 days
    # Flag all invoices with due_date < today - 60 and status != paid
    
    # 5. Round number suspicion (optional)
    # Flag expenses that are exact round numbers > 10000

    return anomalies  # list of {type, description, severity, reference_id}
```

---

## SEED DATA — backend/seed_data.py

Create complete realistic demo data:
```python
def seed_database():
    # Create demo user
    # business: "Sharma General Store", GSTIN: 24ABCDE1234F1Z5
    # email: demo@tallai.com, password: demo123

    # Create 8 customers with realistic names:
    # Raj Traders, Mehta Distributors, Shah Enterprises,
    # Patel & Co, Kumar Brothers, Verma Suppliers,
    # Singh Hardware, Gupta Pharma

    # Create 5 vendors:
    # National Cement Ltd, Tata Steel, Reliance Industries,
    # Local Wholesale Market, Office Supplies Co

    # Create 10 stock items:
    # Cement (bags), Steel Rods (kg), Paint (litre),
    # Tiles (box), Sand (cubic ft), etc.

    # Create 30 sales invoices across last 3 months
    # Mix of paid, partial, overdue, sent statuses

    # Create 20 purchase bills from vendors

    # Create 25 expenses across different categories:
    # Rent (monthly), Salaries, Electricity, Transport, etc.

    # Create payment records for paid invoices

    # All ledger entries auto-created by the above

    print("Seed data created successfully!")
    print("Login: demo@tallai.com / demo123")
```

---

## APP ROUTING — frontend/src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ui/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Invoices from './pages/Invoices'
import InvoiceDetail from './pages/InvoiceDetail'
import Expenses from './pages/Expenses'
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import Vendors from './pages/Vendors'
import Payments from './pages/Payments'
import Ledger from './pages/Ledger'
import Stock from './pages/Stock'
import Reports from './pages/Reports'
import GST from './pages/GST'
import Settings from './pages/Settings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="/invoices/:id" element={<ProtectedRoute><InvoiceDetail /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/customers/:id" element={<ProtectedRoute><CustomerDetail /></ProtectedRoute>} />
          <Route path="/vendors" element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
          <Route path="/ledger" element={<ProtectedRoute><Ledger /></ProtectedRoute>} />
          <Route path="/stock" element={<ProtectedRoute><Stock /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/gst" element={<ProtectedRoute><GST /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
```

---

## UI DESIGN SYSTEM

### Colors:
- Sidebar background: #0f172a (dark navy)
- Sidebar text: #94a3b8
- Sidebar active item: white text, #1e293b background
- Main background: #f8fafc
- Card background: #ffffff
- Primary button: #2563eb (blue)
- Success: #16a34a (green)
- Warning: #d97706 (amber)
- Danger: #dc2626 (red)
- Text primary: #0f172a
- Text secondary: #64748b
- Border: #e2e8f0

### Tailwind config additions:
```javascript
theme: {
  extend: {
    colors: {
      sidebar: '#0f172a',
      primary: '#2563eb',
    }
  }
}
```

### Typography:
- Font: Inter (import from Google Fonts in index.html)
- Page titles: text-xl font-semibold text-gray-900
- Section headers: text-sm font-medium text-gray-500 uppercase tracking-wide
- Table headers: text-xs font-medium text-gray-500 uppercase
- Numbers/amounts: font-mono text-right

### Component patterns:
- All cards: bg-white rounded-xl border border-gray-200 p-5
- All buttons: rounded-lg px-4 py-2 text-sm font-medium transition-colors
- All inputs: border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500
- All tables: divide-y divide-gray-200, header bg-gray-50
- All modals: fixed inset-0 bg-black/50 z-50, centered white card

---

## STARTUP AND README

### start.bat:
```bat
@echo off
title TallAI - Starting...
echo =================================
echo    TallAI - AI Accounting App
echo =================================
echo.

echo [1/2] Starting Backend (FastAPI)...
start cmd /k "title TallAI Backend && cd backend && uvicorn main:app --reload --port 8000"

timeout /t 3

echo [2/2] Starting Frontend (React)...
start cmd /k "title TallAI Frontend && cd frontend && npm run dev"

timeout /t 4

echo.
echo TallAI is running!
echo Backend API:  http://localhost:8000
echo Frontend App: http://localhost:5173
echo API Docs:     http://localhost:8000/docs
echo.
echo Login with: demo@tallai.com / demo123
pause
```

### README.md — complete setup guide:
```markdown
# TallAI — AI-Powered Accounting Software

## Prerequisites
1. Node.js 18+ — https://nodejs.org
2. Python 3.11+ — https://python.org
3. MySQL 8.0 — https://mysql.com/downloads
4. Google Gemini API key (FREE) — https://aistudio.google.com/app/apikey

## Setup (One Time)

### 1. Database
- Open MySQL Workbench or terminal
- Run: CREATE DATABASE tallai;

### 2. Backend
cd backend
pip install -r requirements.txt
- Edit .env: replace YOUR_MYSQL_PASSWORD with your MySQL password
- Edit .env: replace YOUR_GEMINI_API_KEY_HERE with your Gemini API key
- Run seed data: python seed_data.py

### 3. Frontend
cd frontend
npm install

## Run the App
Double-click start.bat
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
```

---

## PRE-FILLED CONFIGURATION — CREATE THESE FILES EXACTLY

### backend/.env (create this file with exactly this content)
```
DATABASE_URL=mysql+pymysql://root:YOUR_MYSQL_PASSWORD@localhost:3306/tallai
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
SECRET_KEY=tallai2024secretkey
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### frontend/.env (create this file with exactly this content)
```
VITE_API_BASE_URL=http://localhost:8000
```

> NOTE FOR USER: In backend/.env, replace REPLACE_WITH_YOUR_API_KEY with your actual
> Google Gemini API key from https://aistudio.google.com/app/apikey
> Set MySQL password to YOUR actual MySQL root password
> MySQL port is already set to: 3306

---

---

## REQUIREMENTS.TXT — CREATE THIS FILE EXACTLY

Create `backend/requirements.txt` with exactly these packages:

```
fastapi==0.111.0
uvicorn==0.30.0
sqlalchemy==2.0.30
pymysql==1.1.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.1
google-generativeai>=0.7.0
apscheduler==3.10.4
python-multipart==0.0.9
pydantic==2.7.0
reportlab==4.1.0
num2words==0.5.13
openpyxl==3.1.2
```

---


## FINAL INSTRUCTIONS

1. Build every single file completely — no placeholder code, no TODOs
2. Every database operation must work: create, read, update, delete
3. The AI chat must actually execute actions — not just talk about them
4. Invoice PDF download must work and produce a professional PDF
5. All calculations (GST, P&L, outstanding) must be mathematically correct
6. Charts must show real data from the database
7. The app must work after: pip install -r requirements.txt && npm install && python seed_data.py && start.bat
8. Test flow to verify: Register → Login → Create Customer → Create Invoice → Record Payment → Check P&L → Chat: "Raj Traders ka outstanding kya hai?"
9. Hindi language detection must work in the AI chat
10. Every page must handle empty states gracefully (no data yet = show helpful empty state, not broken UI)

START BUILDING NOW. Generate every file completely.
