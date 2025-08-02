# Email Delivery Troubleshooting Guide

## Quick Diagnosis Steps

### 1. Check Environment Variables
First, verify your environment variables are properly configured:

```bash
# Check if these environment variables are set
echo $RESEND_API_KEY
echo $RESEND_FROM_EMAIL
echo $RESEND_BCC_EMAIL
```

**Required Variables:**
- `RESEND_API_KEY` - Your Resend API key
- `RESEND_FROM_EMAIL` - Sender email (optional, defaults to hello@mail.bluewhitemedia.online)
- `RESEND_BCC_EMAIL` - Recipient emails (optional, defaults to pavansimha911@gmail.com)

### 2. Use the Test Dashboard
Visit `/test-email` in your application to run comprehensive diagnostics:

1. **Validate Configuration** - Check API keys and domain verification
2. **Send Test Email** - Test email delivery to your inbox
3. **Run System Test** - Comprehensive test with delivery tracking
4. **Test Providers** - Test delivery to multiple email providers

### 3. Check Resend Dashboard
1. Log into your [Resend Dashboard](https://resend.com/emails)
2. Check the "Emails" section for delivery status
3. Look for any failed deliveries or errors
4. Verify your domain is properly configured

## Common Issues and Solutions

### Issue 1: Emails Not Reaching Inbox (Appearing in Spam)

**Symptoms:**
- Emails appear in Resend dashboard as "sent"
- Emails not found in inbox
- Emails found in spam/junk folder

**Solutions:**

#### A. Check Domain Verification
1. Go to Resend Dashboard → Domains
2. Verify `bluewhitemedia.online` is listed and status is "Valid"
3. If not verified, add and verify your domain

#### B. Configure DNS Records
Add these DNS records to your domain:

**SPF Record:**
```
Type: TXT
Name: @ (or bluewhitemedia.online)
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record:**
```
Type: TXT
Name: resend._domainkey
Value: (provided by Resend dashboard)
```

**DMARC Record:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@bluewhitemedia.online
```

#### C. Use Verified Domain
If your domain isn't verified, use Resend's default domain temporarily:

```typescript
// In config.ts, change FROM email to:
FROM: 'onboarding@resend.dev' // or your verified domain
```

### Issue 2: API Key Authentication Errors

**Symptoms:**
- "Unauthorized" or "Invalid API key" errors
- Emails not sending at all

**Solutions:**

#### A. Verify API Key
1. Check your Resend API key is correct
2. Ensure the key has proper permissions
3. Test the key in Resend dashboard

#### B. Environment Variable Setup
Make sure your `.env.local` file contains:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=hello@mail.bluewhitemedia.online
RESEND_BCC_EMAIL=pavansimha911@gmail.com
```

### Issue 3: Rate Limiting

**Symptoms:**
- "Too many requests" errors
- Emails failing after multiple submissions

**Solutions:**

#### A. Check Rate Limits
- Resend allows 100 emails per day on free plan
- Check your usage in Resend dashboard
- Upgrade plan if needed

#### B. Implement Proper Rate Limiting
The current implementation includes rate limiting:
- 3 submissions per hour per IP
- Adjust in `config.ts` if needed

### Issue 4: Email Content Issues

**Symptoms:**
- Emails sent but flagged as spam
- Poor deliverability rates

**Solutions:**

#### A. Optimize Email Content
- Avoid spam trigger words
- Use proper HTML structure
- Include text version
- Add proper headers

#### B. Test Email Content
Use spam checking tools:
- [Mail Tester](https://www.mail-tester.com/)
- [GlockApps](https://glockapps.com/)
- [250ok](https://250ok.com/)

## Testing Procedures

### Step-by-Step Testing

1. **Environment Check**
   ```bash
   # Run environment validation
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"action": "validate-config"}'
   ```

2. **Send Test Email**
   ```bash
   # Send test email to your address
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"action": "send-test", "testRecipient": "your-email@example.com"}'
   ```

3. **Check Delivery Status**
   - Wait 5-10 minutes
   - Check inbox and spam folder
   - Check Resend dashboard for status

4. **Monitor Logs**
   ```bash
   # Check server logs for email details
   npm run dev
   # Look for email-related console logs
   ```

### Email Provider Testing

Test with different email providers:

- **Gmail**: Check both inbox and spam
- **Outlook**: Check junk folder
- **Yahoo**: Check spam folder
- **iCloud**: Check junk folder

## Monitoring and Alerts

### Set Up Monitoring

1. **Email Delivery Tracking**
   - Monitor delivery rates in Resend dashboard
   - Set up alerts for failed deliveries
   - Track bounce rates

2. **Application Logs**
   - Monitor server logs for email errors
   - Set up error alerting
   - Track API response times

3. **User Feedback**
   - Monitor contact form submissions
   - Track user complaints about missing emails
   - Implement email confirmation system

## Emergency Procedures

### If Email System Fails Completely

1. **Immediate Actions**
   - Check Resend service status
   - Verify API key validity
   - Check domain verification status

2. **Fallback Options**
   - Use alternative email service (SendGrid, Mailgun)
   - Implement email queue system
   - Add manual email notification

3. **Communication Plan**
   - Notify team of email issues
   - Update contact form messaging
   - Provide alternative contact methods

## Best Practices

### Email Configuration

1. **Use Verified Domains**
   - Always verify your sending domain
   - Use subdomains for better deliverability
   - Maintain good domain reputation

2. **Proper Email Headers**
   - Set appropriate reply-to addresses
   - Use proper from names
   - Include unsubscribe links

3. **Content Optimization**
   - Write clear, professional content
   - Avoid spam trigger words
   - Use proper HTML structure

### Security

1. **API Key Management**
   - Rotate API keys regularly
   - Use environment variables
   - Never commit keys to version control

2. **Rate Limiting**
   - Implement proper rate limiting
   - Monitor for abuse
   - Set up alerts for unusual activity

## Support Resources

### Documentation
- [Resend Documentation](https://resend.com/docs)
- [Email Deliverability Guide](https://resend.com/docs/deliverability)
- [DNS Configuration Guide](https://resend.com/docs/domains)

### Tools
- [MXToolbox](https://mxtoolbox.com/) - DNS and email testing
- [Mail Tester](https://www.mail-tester.com/) - Email deliverability testing
- [GlockApps](https://glockapps.com/) - Spam testing

### Contact Support
- Resend Support: support@resend.com
- Technical Issues: Check Resend status page
- Domain Issues: Contact your domain registrar

## Quick Reference

### Environment Variables
```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=hello@mail.bluewhitemedia.online
RESEND_BCC_EMAIL=pavansimha911@gmail.com
```

### DNS Records
```
SPF: v=spf1 include:_spf.resend.com ~all
DKIM: (from Resend dashboard)
DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc@bluewhitemedia.online
```

### Test Commands
```bash
# Validate configuration
curl -X POST /api/test-email -d '{"action": "validate-config"}'

# Send test email
curl -X POST /api/test-email -d '{"action": "send-test", "testRecipient": "test@example.com"}'

# Run system test
curl -X POST /api/test-email -d '{"action": "run-system-test", "testRecipient": "test@example.com"}'
```

### Common Error Codes
- `401` - Invalid API key
- `403` - Insufficient permissions
- `429` - Rate limit exceeded
- `500` - Server error

This guide should help you diagnose and resolve most email delivery issues. If problems persist, check the Resend documentation or contact their support team. 