using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Model
{
    public class User: Entity
    {
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public byte[] Salt { get; set; }

        public override string ToString()
        {
            return $"{Email}: {Convert.ToBase64String(Password)} - {Convert.ToBase64String(Salt)}";
        }
    }
}
