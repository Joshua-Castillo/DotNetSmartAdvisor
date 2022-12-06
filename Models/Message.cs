using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SmartAdvisor_ASPNetCoreReact;
public class Message
{
    public List<MailboxAddress> To { get; set; }
    public List<MailboxAddress> From {get; set; }
    public string Subject { get; set; }
    public string Question { get; set; }
    public Message(IEnumerable<string> to,IEnumerable<string> from, string subject, string question)
    {
        To = new List<MailboxAddress>();
        To.AddRange(to.Select(x => new MailboxAddress("email",x)));
       
        From = new List<MailboxAddress>();
        From.AddRange(from.Select(y => new MailboxAddress("email",y)));
        
        Subject = subject;
        Question = question;        
    }
}
