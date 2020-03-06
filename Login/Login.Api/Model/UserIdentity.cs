using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Login.Api.Model
{
    public class UserIdentity: IIdentity
    {
        public UserIdentity(string name)
        {
            this.Name = name;
        }
        public string? AuthenticationType { get; }
        public bool IsAuthenticated { get; }
        public string? Name { get; }
    }
}
