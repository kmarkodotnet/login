using System.Text;
using System.Threading.Tasks;
using Login.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Login.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            IdentityModelEventSource.ShowPII = true;
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://kmarkologin.eu.auth0.com/";
                    options.Audience = "B0hvw0bwf4P0eWYBDjX87UZNekk6JamX";
                    
                    options.Events = new JwtBearerEvents
                    {
                        //OnAuthenticationFailed = AuthenticationFailed,
                        //OnForbidden = Forbidden,
                        //OnTokenValidated = TokenValidated,
                        //OnMessageReceived = MessageRecieved,
                        //OnChallenge = Challange
                    };

                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        NameClaimType = "name"
                    };

                });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        //.AllowAnyOrigin()
                        .WithOrigins("http://localhost:4200/lessons", "https://localhost:4200", "http://localhost:4200", "http://localhost:4200/signup")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        //.WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .AllowCredentials()
                        .Build());
            });

            //services.AddAntiforgery(options =>
            //{
            //    options.HeaderName = "XSRF-TOKEN";
            //});
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env
            //, IAntiforgery antiforgery
            )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            ////https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/write?view=aspnetcore-3.1
            //app.UseRetrieveUserIdFromRequest();

            //app.UseWhen(c => 
            //        c.Request.Path.StartsWithSegments("/api/lessons"), appbuilder => 
            //    appbuilder.UseCheckIfAuthenticatedRequest()
            //);

            //app.UseAntiforgeryRequest(antiforgery);


            //some better solutions:
            //https://www.c-sharpcorner.com/article/asp-net-web-api-2-creating-and-validating-jwt-json-web-token/
            //https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/

            app.UseRouting();

            app.UseCors("CorsPolicy");
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.UseAuthentication();


            DataContext.Init();
        }

        private Task AuthenticationFailed(AuthenticationFailedContext arg)
        {
            // For debugging purposes only!
            var s = $"AuthenticationFailed: {arg.Exception.Message}";
            arg.Response.ContentLength = s.Length;
            arg.Response.Body.WriteAsync(Encoding.UTF8.GetBytes(s), 0, s.Length);
            return Task.FromResult(0);
        }


        private Task Forbidden(ForbiddenContext arg)
        {
            var s = $"AuthenticationFailed: {""}";
            arg.Response.ContentLength = s.Length;
            arg.Response.Body.WriteAsync(Encoding.UTF8.GetBytes(s), 0, s.Length);
            return Task.FromResult(0);
        }


        private Task TokenValidated(TokenValidatedContext arg)
        {
            var s = $"AuthenticationFailed: {""}";
            return Task.FromResult(arg.Response);
        }

        private Task MessageRecieved(MessageReceivedContext arg)
        {
            var s = $"AuthenticationFailed: {""}";
            return Task.FromResult(arg.Response);
        }

        private Task Challange(JwtBearerChallengeContext arg)
        {
            var s = $"AuthenticationFailed: {""}";
            return Task.FromResult(arg.Response);
        }

    }
}
