using Newtonsoft.Json;

namespace SmartAdvisor_ASPNetCoreReact;

public class CosmosDBItem
{
    [JsonProperty("id")]
    public string? Id { get; set; }
    [JsonProperty("dataset")]
    public string? Dataset { get; set; }
    [JsonProperty("data")]
    public ObjectData? Data { get; set; }
}