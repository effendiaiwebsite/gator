# Xano Setup Guide - Gator Bookkeeping App

**Time to Complete**: 20-30 minutes
**Cost**: Free (Launch tier)

---

## Step 1: Create Your Workspace

1. **Login to Xano**: Go to https://xano.com and login with your new account
2. **Create New Workspace**:
   - Click "Create New Workspace"
   - Name: `gator-bookkeeping` (or your preferred name)
   - Region: Choose closest to your users (e.g., US East, Canada)
   - Click "Create"

---

## Step 2: Set Up Database Tables

### Table 1: `clients`

1. Click **"Database"** in left sidebar
2. Click **"Add Table"**
3. Name: `clients`
4. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `id` | Integer | Auto-increment, Primary Key (auto-created) |
| `email` | Text | Required, Unique |
| `first_name` | Text | Required |
| `last_name` | Text | Required |
| `province` | Text | Default: 'ON' |
| `annual_revenue` | Text | Default: '0-50k' |
| `employee_count` | Text | Default: '0' |
| `estimated_savings` | Integer | Default: 0 |
| `status` | Text | Default: 'bronze' |
| `ad_source` | Text | Default: 'Organic' |
| `utm_campaign` | Text | Nullable |
| `magic_link_token` | Text | Nullable, Indexed |
| `token_expires_at` | Timestamp | Nullable |
| `created_at` | Timestamp | Default: NOW() |

5. Click **"Save Table"**

---

### Table 2: `documents`

1. Click **"Add Table"**
2. Name: `documents`
3. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `id` | Integer | Auto-increment, Primary Key |
| `client_id` | Integer | Required, Foreign Key to `clients.id` |
| `file_name` | Text | Required |
| `file_type` | Text | Required (T4, T4A, T5, etc.) |
| `file_url` | Text | Required (Xano file storage URL) |
| `file_size` | Integer | Required (in bytes) |
| `encrypted` | Boolean | Default: true |
| `uploaded_at` | Timestamp | Default: NOW() |

4. **Add Relationship**:
   - Click "Add Relationship"
   - Relationship: `documents` **belongs to** `clients`
   - Foreign Key: `client_id` → `clients.id`
   - On Delete: CASCADE (delete docs when client deleted)

5. Click **"Save Table"**

---

### Table 3: `messages`

1. Click **"Add Table"**
2. Name: `messages`
3. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `id` | Integer | Auto-increment, Primary Key |
| `client_id` | Integer | Required, Foreign Key to `clients.id` |
| `sender` | Text | Required ('admin' or 'client') |
| `text` | Text | Required |
| `sent_at` | Timestamp | Default: NOW() |
| `read` | Boolean | Default: false |

4. **Add Relationship**:
   - Relationship: `messages` **belongs to** `clients`
   - Foreign Key: `client_id` → `clients.id`
   - On Delete: CASCADE

5. Click **"Save Table"**

---

### Table 4: `payments`

1. Click **"Add Table"**
2. Name: `payments`
3. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `id` | Integer | Auto-increment, Primary Key |
| `client_id` | Integer | Required, Foreign Key to `clients.id` |
| `amount` | Decimal | Required, Precision: 10,2 |
| `status` | Text | Default: 'pending' |
| `stripe_payment_id` | Text | Nullable |
| `paid_at` | Timestamp | Nullable |
| `created_at` | Timestamp | Default: NOW() |

4. **Add Relationship**:
   - Relationship: `payments` **belongs to** `clients`
   - Foreign Key: `client_id` → `clients.id`
   - On Delete: RESTRICT (prevent deletion if payments exist)

5. Click **"Save Table"**

---

## Step 3: Create API Endpoints

### Endpoint 1: Create Lead (Public)

1. Click **"API"** in left sidebar
2. Click **"Add API Group"** → Name: `Public`
3. Click **"Add Endpoint"**
4. Configure:
   - **Method**: POST
   - **Path**: `/lead`
   - **Name**: `create_lead`
   - **Auth**: None (public endpoint)

5. **Add Function Stack**:

   **a) Input Validation**
   - Add: **"Run Function"** → **"Validate Input"**
   - Required fields: `email`, `first_name`, `last_name`

   **b) Check Existing Client**
   - Add: **"Query Database"** → **"Get Record"**
   - Table: `clients`
   - Filter: `email` equals `$input.email`
   - Store as: `existing_client`

   **c) Conditional: If Client Exists**
   - Add: **"If/Else"**
   - Condition: `existing_client` is not empty
   - **If True**: Return error: "Email already registered"

   **d) Generate Magic Link Token**
   - Add: **"Run Function"** → **"Generate Random String"**
   - Length: 32
   - Characters: alphanumeric
   - Store as: `magic_token`

   **e) Set Token Expiry**
   - Add: **"Run Function"** → **"Date Math"**
   - Operation: Add 7 days to NOW()
   - Store as: `token_expiry`

   **f) Create Client Record**
   - Add: **"Query Database"** → **"Add Record"**
   - Table: `clients`
   - Fields:
     - `email`: `$input.email`
     - `first_name`: `$input.first_name`
     - `last_name`: `$input.last_name`
     - `province`: `$input.province`
     - `annual_revenue`: `$input.annual_revenue`
     - `employee_count`: `$input.employee_count`
     - `estimated_savings`: `$input.estimated_savings`
     - `ad_source`: `$input.ad_source`
     - `utm_campaign`: `$input.utm_campaign`
     - `magic_link_token`: `$magic_token`
     - `token_expires_at`: `$token_expiry`
   - Store as: `new_client`

   **g) Send Email (Optional - add later)**
   - Add: **"Send Email"**
   - To: `$new_client.email`
   - Subject: "Welcome to Gator Bookkeeping!"
   - Body: Magic link with token
   - **NOTE**: Skip this for now, we'll test with manual tokens first

   **h) Return Response**
   - Add: **"Response"**
   - Status: 200
   - Body:
     ```json
     {
       "success": true,
       "client_id": "$new_client.id",
       "message": "Magic link sent to $new_client.email",
       "token": "$magic_token"
     }
     ```
     (NOTE: Remove `token` from response in production - only for testing!)

6. Click **"Save"**

---

### Endpoint 2: Verify Magic Link (Public)

1. In **Public** API Group, click **"Add Endpoint"**
2. Configure:
   - **Method**: GET
   - **Path**: `/auth/verify`
   - **Name**: `verify_magic_link`
   - **Auth**: None

3. **Add Function Stack**:

   **a) Get Token from Query**
   - Input should have: `token` (query parameter)

   **b) Find Client by Token**
   - Add: **"Query Database"** → **"Get Record"**
   - Table: `clients`
   - Filter: `magic_link_token` equals `$input.token`
   - Store as: `client`

   **c) Validate Token**
   - Add: **"If/Else"**
   - Condition: `client` is empty OR `client.token_expires_at` < NOW()
   - **If True**: Return error 401: "Invalid or expired token"

   **d) Clear Token (One-time use)**
   - Add: **"Query Database"** → **"Edit Record"**
   - Table: `clients`
   - Record ID: `$client.id`
   - Set: `magic_link_token` = NULL

   **e) Return User Data**
   - Add: **"Response"**
   - Status: 200
   - Body:
     ```json
     {
       "user": {
         "id": "$client.id",
         "email": "$client.email",
         "first_name": "$client.first_name",
         "last_name": "$client.last_name",
         "status": "$client.status",
         "estimated_savings": "$client.estimated_savings"
       },
       "token": "JWT_TOKEN_HERE"
     }
     ```
     (NOTE: We'll add JWT authentication in next step)

4. Click **"Save"**

---

### Endpoint 3: Get Dashboard (Authenticated)

1. Click **"Add API Group"** → Name: `Client`
2. Add **Authentication** to this group (we'll set this up next)
3. Click **"Add Endpoint"**
4. Configure:
   - **Method**: GET
   - **Path**: `/client/dashboard`
   - **Name**: `get_dashboard`
   - **Auth**: Required (inherits from group)

5. **Add Function Stack**:

   **a) Get Client Data**
   - Client ID will come from `$auth.user.id` (from JWT token)
   - Add: **"Query Database"** → **"Get Record"**
   - Table: `clients`
   - Filter: `id` equals `$auth.user.id`
   - Store as: `client`

   **b) Get Documents**
   - Add: **"Query Database"** → **"Query All"**
   - Table: `documents`
   - Filter: `client_id` equals `$client.id`
   - Sort: `uploaded_at` DESC
   - Store as: `documents`

   **c) Get Messages**
   - Add: **"Query Database"** → **"Query All"**
   - Table: `messages`
   - Filter: `client_id` equals `$client.id`
   - Sort: `sent_at` ASC
   - Store as: `messages`

   **d) Get Payments**
   - Add: **"Query Database"** → **"Query All"**
   - Table: `payments`
   - Filter: `client_id` equals `$client.id`
   - Sort: `created_at` DESC
   - Store as: `payments`

   **e) Return Dashboard**
   - Add: **"Response"**
   - Status: 200
   - Body:
     ```json
     {
       "client": "$client",
       "documents": "$documents",
       "messages": "$messages",
       "payments": "$payments"
     }
     ```

6. Click **"Save"**

---

### Endpoint 4: Upload Document (Authenticated)

1. In **Client** API Group, click **"Add Endpoint"**
2. Configure:
   - **Method**: POST
   - **Path**: `/client/upload`
   - **Name**: `upload_document`
   - **Auth**: Required

3. **Add Function Stack**:

   **a) Upload File to Xano Storage**
   - Add: **"Upload File"**
   - Input field: `file`
   - Storage: Default
   - Store as: `uploaded_file`

   **b) Validate File**
   - Add: **"If/Else"**
   - Condition: `uploaded_file.size` > 10485760 (10MB)
   - **If True**: Return error: "File too large"

   **c) Create Document Record**
   - Add: **"Query Database"** → **"Add Record"**
   - Table: `documents`
   - Fields:
     - `client_id`: `$auth.user.id`
     - `file_name`: `$uploaded_file.name`
     - `file_type`: `$input.file_type`
     - `file_url`: `$uploaded_file.path`
     - `file_size`: `$uploaded_file.size`
     - `encrypted`: true
   - Store as: `document`

   **d) Update Client Status**
   - Add: **"Run Function"** → **"Custom Function"**
   - Logic: Check document count, upgrade to silver/gold
   - (We'll implement this later)

   **e) Return Success**
   - Add: **"Response"**
   - Status: 200
   - Body:
     ```json
     {
       "success": true,
       "document_id": "$document.id",
       "message": "File uploaded successfully"
     }
     ```

4. Click **"Save"**

---

### Endpoint 5: Send Message (Authenticated)

1. In **Client** API Group, click **"Add Endpoint"**
2. Configure:
   - **Method**: POST
   - **Path**: `/client/message`
   - **Name**: `send_message`
   - **Auth**: Required

3. **Add Function Stack**:

   **a) Create Message**
   - Add: **"Query Database"** → **"Add Record"**
   - Table: `messages`
   - Fields:
     - `client_id`: `$auth.user.id`
     - `sender`: 'client'
     - `text`: `$input.text`
   - Store as: `message`

   **b) Return Success**
   - Add: **"Response"**
   - Status: 200
   - Body:
     ```json
     {
       "success": true,
       "message_id": "$message.id"
     }
     ```

4. Click **"Save"**

---

## Step 4: Enable CORS

1. Click **"Settings"** in left sidebar
2. Click **"API Settings"**
3. Scroll to **"CORS Settings"**
4. **Allowed Origins**: Add `http://localhost:5173` (for development)
5. **Allowed Methods**: GET, POST, PUT, DELETE
6. **Allowed Headers**: Content-Type, Authorization
7. Click **"Save"**

---

## Step 5: Get Your API URL

1. Click **"API"** in left sidebar
2. At the top, you'll see **"Base URL"**
3. Copy this URL - it looks like: `https://x8ki-letl-twmt.n7.xano.io/api:xxxx`
4. This is your **XANO_API_URL**

---

## Step 6: Configure Frontend

1. **Create `.env` file** in your project root:

```bash
cd /home/vboxuser/programs/JoeyAds/Gator/gator-app
touch .env
```

2. **Add your Xano URL**:

```env
VITE_XANO_API_URL=https://x8ki-letl-twmt.n7.xano.io/api:xxxx
VITE_XANO_API_KEY=your_api_key_here
```

3. **Update `src/config/xano.js`**:

Read the current file first, then we'll update the MOCK_MODE logic to use the environment variable.

---

## Step 7: Test Your Setup

### Test 1: Create a Lead

```bash
curl -X POST https://your-xano-url/api:xxxx/lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "province": "ON",
    "annual_revenue": "100k-250k",
    "employee_count": "1-5",
    "estimated_savings": 5000
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "client_id": 1,
  "message": "Magic link sent to test@example.com",
  "token": "abc123xyz..."
}
```

### Test 2: Verify Magic Link

```bash
curl "https://your-xano-url/api:xxxx/auth/verify?token=abc123xyz..."
```

**Expected Response**:
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "first_name": "Test",
    ...
  }
}
```

---

## Next Steps

1. **Set up JWT Authentication** (for secure authenticated endpoints)
2. **Add Email Integration** (SendGrid or Postmark for magic links)
3. **Implement File Encryption** (client-side before upload)
4. **Add Admin Endpoints** (for Phase 4 CRM)
5. **Connect Google Analytics** (GA4 tracking)

---

## Troubleshooting

### "CORS Error"
- Check CORS settings in Xano
- Make sure `http://localhost:5173` is in Allowed Origins

### "Token Not Found"
- Check the token is being stored in `clients.magic_link_token`
- Verify token hasn't expired
- Check token is passed correctly in URL query

### "Database Error"
- Verify all table relationships are set up
- Check field types match (Integer for IDs, Text for strings)
- Make sure Foreign Keys are configured

---

## Cost Estimate

- **Launch (Free)**: 1,000 requests/day, 1GB storage
- **Starter ($25/mo)**: 100,000 requests/day, 10GB storage
- **Pro ($85/mo)**: 1M requests/day, 100GB storage

**For Testing**: Launch tier is plenty!
**For Production**: Start with Starter tier ($25/mo)

---

## Need Help?

If you get stuck at any step, let me know:
1. What step you're on
2. What error you're seeing
3. Screenshot if possible

I'll help you debug! 🐊
