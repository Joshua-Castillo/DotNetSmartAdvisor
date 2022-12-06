using Newtonsoft.Json;

namespace SmartAdvisor_ASPNetCoreReact;

public class ObjectData
{
    [JsonProperty("faculty-catalog")]
    public List<FacultyCatalog>? FacultyCatalogData { get; set; }

    [JsonProperty("sessions")]
    public List<Sessions>? SessionsData { get; set; }
    [JsonProperty("course-catalog")]
    public List<CourseCatalog>? CourseCatalogData { get; set; }
}