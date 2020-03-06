using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Login.Api
{
    public class RetrieveUserIdFromRequest
    {
        private readonly RequestDelegate _next;

        public RetrieveUserIdFromRequest(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var cultureQuery = context.Request.Query["culture"];
            if (!string.IsNullOrWhiteSpace(cultureQuery))
            {
                
            }
            await _next(context);
        }
    }
}
