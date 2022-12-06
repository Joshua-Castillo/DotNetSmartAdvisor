using Microsoft.Azure.Cosmos;
namespace SmartAdvisor_ASPNetCoreReact.Services;
public interface ICosmosService
{
    Task<List<CosmosDBItem>> Get(string sqlCosmosQuery);
}