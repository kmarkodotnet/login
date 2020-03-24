using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;

namespace Login.Api
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseRetrieveUserIdFromRequest(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RetrieveUserIdFromRequestMiddleware>();
        }
        public static IApplicationBuilder UseCheckIfAuthenticatedRequest(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CheckIfAuthenticatedMiddleware>();
        }
        
    }
}
