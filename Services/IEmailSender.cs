namespace SmartAdvisor_ASPNetCoreReact.Services;
public interface IEmailSender
{
    void SendEmail(Message message);
}