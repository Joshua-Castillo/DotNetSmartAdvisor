using Newtonsoft.Json;

public class FacultyCatalog
{
    [JsonProperty("Faculty Code")]
    public string? FacCode { get; set; }
    [JsonProperty("Faculty Descr")]
    public string? FacDescr { get; set; }
    [JsonProperty("Department Code")]
    public string? DepCode { get; set; }
    [JsonProperty("Department Descr")]
    public string? DepDescr { get; set; }
}
