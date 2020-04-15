using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Model
{
    public class User: Entity
    {
        public string Email { get; set; }
        public string AuthenticationId { get; set; }


        public override string ToString()
        {
            return $"{Email}: {AuthenticationId}";
        }
    }
}
