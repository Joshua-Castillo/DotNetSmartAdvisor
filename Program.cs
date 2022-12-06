using Azure;
using Azure.AI.Language.QuestionAnswering;
using Microsoft.Azure.Cosmos;
using System;
using SmartAdvisor_ASPNetCoreReact.Services;
using SmartAdvisor_ASPNetCoreReact;

var CORSPolicy = "CORSPolicy1";
var CORSPolicy2 = "CORSPolicy2";
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton<ICosmosService>(options =>
{
    string url = builder.Configuration.GetSection("AzureCosmosDbSettings")
    .GetValue<string>("URL");
    string primaryKey = builder.Configuration.GetSection("AzureCosmosDbSettings")
    .GetValue<string>("PrimaryKey");
    string dbName = builder.Configuration.GetSection("AzureCosmosDbSettings")
    .GetValue<string>("DatabaseName");
    string containerName = builder.Configuration.GetSection("AzureCosmosDbSettings")
    .GetValue<string>("ContainerName");

    var cosmosClient = new CosmosClient(
        url,
        primaryKey
    );

    return new CosmosService(cosmosClient, dbName, containerName);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(CORSPolicy, builder =>
    {
        builder
        .WithOrigins("*"
        ).AllowAnyHeader().AllowAnyMethod();
    });

    options.AddPolicy(CORSPolicy2, builder =>
    {
        builder
        .WithOrigins("*"
        ).AllowAnyHeader().AllowAnyMethod();
    });
});

var emailConfig = builder.Configuration
        .GetSection("EmailConfiguration")
        .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);
builder.Services.AddControllers();

builder.Services.AddScoped<IEmailSender, EmailSender>();
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html");

app.Run();
