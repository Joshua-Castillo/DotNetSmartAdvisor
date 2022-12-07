# DotNetSmartAdvisor

IDE:

VS Code
Installation Guide:

run on terminal inside SmartAdvisor folder:
dotnet new -i Microsoft.Bot.Framework.CSharp.EchoBot
dotnet new -i Microsoft.Bot.Framework.CSharp.CoreBot
dotnet new -i Microsoft.Bot.Framework.CSharp.EmptyBot
dotnet add package Microsoft.Bot.Builder.Dialogs
Extensions to install:

C#
.NET Extension Package
.NET Core Tools
How to connect Chatbot

cd into SmartAdvisor-ASPNetCoreReact
cd into ClientAppietn
run command 'npm install react-chatbot-kit --save-dev'
How to run React App

cd .. (to go back to SmartAdvisor_ASPNetCoreReact)

run command 'dotnet restore'

run command 'dotnet build'

run command 'dotnet run'

if needed, run dotnet dev-certs https --trust

How to run dev test with Swagger

cd into SmartAdvisor_ASPNetCoreReact
run command 'dotnet restore'
run command 'dotnet build'
run command 'dotnet run'
open browser to https://localhost:/swagger/v1/swagger.json
open browser to https://localhost:/swagger/
