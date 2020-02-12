using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {

        [HttpPost]
        public void Logout()
        {
            var sessionId = Request.Cookies["SESSIONID"];

            SessionStore.DestroySession(sessionId);

            Response.Cookies.Delete("SESSIONID");
        }
    }
}