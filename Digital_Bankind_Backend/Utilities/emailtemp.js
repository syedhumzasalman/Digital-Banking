export const emailTemplate = ({ otp, name }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - OTP Code</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .content {
            padding: 50px 40px;
        }

        .greeting {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .message {
            color: #555;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .otp-container {
            margin: 40px 0;
            text-align: center;
        }

        .otp-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            display: inline-block;
            width: 100%;
        }

        .otp-label {
            color: rgba(255,255,255,0.8);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .otp-code {
            font-size: 42px;
            font-weight: bold;
            color: white;
            letter-spacing: 12px;
            font-family: 'Courier New', monospace;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            margin: 10px 0;
        }

        .otp-validity {
            color: rgba(255,255,255,0.7);
            font-size: 13px;
            margin-top: 15px;
        }

        .info-box {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            margin: 30px 0;
        }

        .info-box h3 {
            color: #333;
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .info-box ul {
            color: #555;
            font-size: 14px;
            padding-left: 20px;
            line-height: 1.8;
        }

        .info-box li {
            margin-bottom: 5px;
        }

        .support-text {
            color: #777;
            font-size: 13px;
            line-height: 1.6;
            text-align: center;
            margin-top: 30px;
        }

        .support-text a {
            color: #667eea;
            text-decoration: none;
        }

        @media (max-width: 640px) {
            body {
                padding: 20px 10px;
            }

            .content {
                padding: 30px 20px;
            }

            .otp-code {
                font-size: 32px;
                letter-spacing: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
    <!-- Bank Header -->
    <div class="header">
        <h1>SecureBank</h1>
        <p>Your Trusted Digital Banking Partner</p>
    </div>
    
    <!-- Content -->
    <div class="content">
        <p class="greeting">Dear ${name},</p>
        
        <p class="message">
            For your security, we require OTP verification to access your Digital Banking account or to submit a complaint report. Use the verification code below to proceed:
        </p>

        <!-- OTP Code -->
        <div class="otp-container">
            <div class="otp-box">
                <p class="otp-label">Your One-Time Password (OTP)</p>
                <div class="otp-code">${otp}</div>
                <p class="otp-validity">Valid for 10 minutes</p>
            </div>
        </div>

        <!-- Information Box -->
        <div class="info-box">
            <h3>📌 Security Reminders:</h3>
            <ul>
                <li>Do not share this code with anyone, including bank staff</li>
                <li>This code expires in 10 minutes for your protection</li>
                <li>If you did not request this, please contact us immediately</li>
            </ul>
        </div>

        <p class="support-text">
            Need assistance with your Digital Banking or Complaint Report System? Reach out to our support team at 
            <a href="mailto:support@securebank.com">support@securebank.com</a> or call 1-800-SECURE.
        </p>
        
        <p class="footer-text">
            Thank you for banking with SecureBank. Stay secure!
        </p>
    </div>
</div>
</body>
</html>`
}