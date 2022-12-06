using Newtonsoft.Json;
namespace SmartAdvisor_ASPNetCoreReact;
public class CourseCatalog
{
    [JsonProperty("Course ID")]
    public int? Id { get; set; }
    [JsonProperty("Subject")]
    public string? Subject { get; set; }
    [JsonProperty("Catalog")]
    public string? Catalog { get; set; }
    [JsonProperty("Long Title")]
    public string? LongTitle { get; set; }
    [JsonProperty("Class Units")]
    public string? ClassUnits { get; set; }
    [JsonProperty("Component Code")]
    public string? ComponentCode { get; set; }
    [JsonProperty("Component Descr")]
    public string? ComponentDescr { get; set; }
    [JsonProperty("Pre Requisite Description")]
    public string? PreRequisiteDescription { get; set; }
    [JsonProperty("Career")]
    public string? Career { get; set; }
    [JsonProperty("Equivalent Courses")]
    public string? EquivalentCourses { get; set; }
}
