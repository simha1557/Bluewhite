# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-07-31-contact-form-system/spec.md

## Endpoints

### POST /api/contact

**Purpose:** Process contact form submissions, validate data, send email, and store in database
**Parameters:** 
- `name` (string, required) - Contact person's full name
- `email` (string, required) - Valid email address
- `company` (string, optional) - Company or organization name  
- `message` (string, required) - Inquiry message content

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com", 
  "company": "Acme Corp",
  "message": "I need help with web design for my startup."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "uuid-generated-id"
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": ["Invalid email format"],
    "message": ["Message is required"]
  }
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to process contact form"
}
```

**Errors:** 
- 400: Validation errors, missing required fields
- 429: Rate limiting exceeded
- 500: Database connection, email sending, or other server errors

## Controllers

### Contact Form Controller

**Action:** `handleContactSubmission`
**Business Logic:** 
1. Validate input data using Zod schema
2. Check for rate limiting per IP address
3. Insert submission into Supabase contacts table
4. Send email notification via Resend API
5. Return success response with submission ID

**Error Handling:**
- Validate all inputs before processing
- Rollback database insertion if email fails
- Log errors for debugging while returning generic error messages
- Implement proper HTTP status codes for different error types

**Rate Limiting:**
- Maximum 3 submissions per IP address per hour
- Use in-memory cache or database tracking
- Return 429 status code when limit exceeded

**Email Template:**
- HTML formatted email with agency branding
- Include all form fields formatted clearly
- Add timestamp and submission ID for tracking
- Configure reply-to as the submitter's email address