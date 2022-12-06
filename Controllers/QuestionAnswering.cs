using Microsoft.AspNetCore.Mvc;

using Azure;
using Azure.AI.Language.QuestionAnswering;
using System;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using SmartAdvisor_ASPNetCoreReact.Services;
namespace SmartAdvisor_ASPNetCoreReact.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuestionAnswering : ControllerBase
{
    private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

    private readonly IEmailSender _emailSender;
    public QuestionAnswering(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    [EnableCors("CORSPolicy1")]
    [HttpGet]
    public String Get()
    {
        var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        String myEndpoint = MyConfig.GetValue<string>("AppSettings:myEndpoint");
        String azureKeyCredential = MyConfig.GetValue<string>("AppSettings:azureKeyCredential");
        String projectName = MyConfig.GetValue<string>("AppSettings:projectName");
        String deploymentName = MyConfig.GetValue<string>("AppSettings:deploymentName");


        Uri endpoint = new Uri(myEndpoint);
        AzureKeyCredential credential = new AzureKeyCredential(azureKeyCredential);
        string question = "What options do I have for electives for ELEC?";

        QuestionAnsweringClient client = new QuestionAnsweringClient(endpoint, credential);
        QuestionAnsweringProject project = new QuestionAnsweringProject(projectName, deploymentName);

        Response<AnswersResult> response = client.GetAnswers(question, project);

        return JsonConvert.SerializeObject(response);
    }

    [EnableCors("CORSPolicy2")]
    [HttpPost("question/{id}")]
    public String PostByQuestion(string id)
    {
        var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        String myEndpoint = MyConfig.GetValue<string>("AppSettings:myEndpoint");
        String azureKeyCredential = MyConfig.GetValue<string>("AppSettings:azureKeyCredential");
        String projectName = MyConfig.GetValue<string>("AppSettings:projectName");
        String deploymentName = MyConfig.GetValue<string>("AppSettings:deploymentName");

        Uri endpoint = new Uri(myEndpoint);
        AzureKeyCredential credential = new AzureKeyCredential(azureKeyCredential);

        QuestionAnsweringClient client = new QuestionAnsweringClient(endpoint, credential);
        QuestionAnsweringProject project = new QuestionAnsweringProject(projectName, deploymentName);

        Response<AnswersResult> response = client.GetAnswers(id, project);

        return JsonConvert.SerializeObject(response);
    }
    // [EnableCors("CORSPolicy1")]
    //email 1=advisor email, email 2=student email, string= questoin
    [EnableCors("CORSPolicy2")]
    [HttpPost("email/{advisorEmail}/{studentEmail}/{subject}/{question}")]
    public IEnumerable<WeatherForecast> GetEmail(string advisorEmail, string studentEmail, string subject, string question)
    {
        var rng = new Random();
        // advisorEmail = "coen424gr11@outlook.com";
        // studentEmail = "assoulineclara@gmail.com";
        // subject = ("A student has a question");
        // question = "Last question asked";
        var message = new Message(new string[] { advisorEmail }, new string[] { studentEmail }, subject, question);
        _emailSender.SendEmail(message);
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = rng.Next(-20, 55),
            Summary = Summaries[rng.Next(Summaries.Length)]
        })
            .ToArray();
        //return message;
    }


}
