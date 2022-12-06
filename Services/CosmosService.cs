using Microsoft.Azure.Cosmos;
using SmartAdvisor_ASPNetCoreReact.Services;

namespace SmartAdvisor_ASPNetCoreReact;
public class CosmosService : ICosmosService
{
    private readonly Container _container;
    public CosmosService(CosmosClient cosmosClient,
    string databaseName,
    string containerName)
    {
        _container = cosmosClient.GetContainer(databaseName, containerName);
    }
    public async Task<List<CosmosDBItem>> Get(string sqlCosmosQuery)
    {
        var query = _container.GetItemQueryIterator<CosmosDBItem>(new QueryDefinition(sqlCosmosQuery));

        List<CosmosDBItem> result = new List<CosmosDBItem>();
        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            result.AddRange(response);
        }

        return result;
    }
}