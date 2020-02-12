using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Login.Api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public UserModel Get()
        {
            var sessionId = Request.Cookies["SESSIONID"];
            
            if (!string.IsNullOrWhiteSpace(sessionId) && SessionStore.FindUserBySessionId(sessionId) != null)
            {
                return SessionStore.FindUserBySessionId(sessionId);
            }
            else
            {
                Response.StatusCode = 203;
                return null;
            }
        }
    }
}