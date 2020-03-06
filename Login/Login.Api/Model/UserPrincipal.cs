using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Login.Api.Model
{
    public class UserPrincipal : IPrincipal
    {
        public UserPrincipal(string id)
        {
            this.Identity = new UserIdentity(id);
        }
        public string Id { get; set; }
        public bool IsInRole(string role)
        {
            throw new NotImplementedException();
        }

        public IIdentity? Identity { get; }
    }
}
