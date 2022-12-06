using Microsoft.AspNetCore.Mvc;
using SmartAdvisor_ASPNetCoreReact.Services;
using Microsoft.AspNetCore.Cors;

namespace SmartAdvisor_ASPNetCoreReact;

[ApiController]
[Route("api/[controller]")]
public class CosmosController : ControllerBase
{
    public readonly ICosmosService _myCosmosService;
    public CosmosController(ICosmosService myCosmosService)
    {
        _myCosmosService = myCosmosService;
    }
    [EnableCors("CORSPolicy1")]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var sqlCosmosQuery = "Select * from c";
        var result = await _myCosmosService.Get(sqlCosmosQuery);
        return Ok(result);
    }
}
