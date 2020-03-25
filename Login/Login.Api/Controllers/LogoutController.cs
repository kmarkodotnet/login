﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : LoginBaseController
    {
        [HttpPost]
        public void Logout()
        {
            Response.Cookies.Delete("SESSIONID");
        }
    }
}