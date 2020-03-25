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
    public class RetrieveUserIdFromRequestMiddleware
    {
        private readonly RequestDelegate _next;

        public RetrieveUserIdFromRequestMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var sessionToken = context.Request.Cookies["sessionId"];
            if (!string.IsNullOrEmpty(sessionToken))
            {
                var userId = JwtManager.DecodeUserIdFromToken(sessionToken);
                context.User = new ClaimsPrincipal(new UserPrincipal(userId));
            }

            // Call the next delegate/middleware in the pipeline
            await _next(context);
        }
    }
}
