interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactEmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
      New Contact Form Submission
    </h2>
    
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555', marginBottom: '5px' }}>From:</h3>
      <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <strong>{name}</strong> &lt;{email}&gt;
      </p>
    </div>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555', marginBottom: '5px' }}>Subject:</h3>
      <p style={{ margin: 0, padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        {subject}
      </p>
    </div>

    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555', marginBottom: '5px' }}>Message:</h3>
      <div style={{ margin: 0, padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
        {message}
      </div>
    </div>

    <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #dee2e6', color: '#6c757d', fontSize: '14px' }}>
      <p>This email was sent from your portfolio contact form.</p>
    </div>
  </div>
)
