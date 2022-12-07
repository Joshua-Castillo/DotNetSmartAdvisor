namespace SmartAdvisor_ASPNetCoreReact;

// public class MailRequest
// {
//     public string ToEmail { get; set; }
//     public string Subject { get; set; }
//     public string Body { get; set; }
//     public List<IFormFile> Attachments { get; set; }
// }
public class EmailConfiguration
{
    public string? From { get; set; }
    public string? SmtpServer { get; set; }
    public int Port { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
}