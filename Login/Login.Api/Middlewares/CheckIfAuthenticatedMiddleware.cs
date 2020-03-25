using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Login.Api.Model;
using Login.Logic;
using Microsoft.AspNetCore.Http;

namespace Login.Api.Middlewares
{
    public class CheckIfAuthenticatedMiddleware
    {
        private readonly RequestDelegate _next;

        public CheckIfAuthenticatedMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!string.IsNullOrEmpty(context.User?.Identity?.Name))
            {
                await _next(context);
            }
            else
            {
                context.Response.StatusCode = 403;
            }
        }
    }
}
