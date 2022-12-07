using Newtonsoft.Json;

public class DateFormat
{
    [JsonProperty("YYYY")]
    public string? YYYY { get; set; }
}
public class Date
{
    [JsonProperty("MM")]
    public DateFormat? MM { get; set; }
}

public class Sessions
{
    [JsonProperty("Career")]
    public string? Career { get; set; }
    [JsonProperty("Term Code")]
    public int? TermCode { get; set; }
    [JsonProperty("Term Descr")]
    public string? TermDescr { get; set; }
    [JsonProperty("Session Code")]
    public string? SesCode { get; set; }
    [JsonProperty("Session Descr")]
    public string? SesDescr { get; set; }
    [JsonProperty("Session Begin Date DD")]
    public Date? SesBegDate { get; set; }
    [JsonProperty("Session End Date DD")]
    public Date? SesEndDate { get; set; }
}