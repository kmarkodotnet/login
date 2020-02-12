using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Api.Model
{
    public class Session
    {
        private readonly int VALIDITY_MINUTES = 2;

        public Session(string SessionId, UserModel User)
        {
            this.SessionId = SessionId;
            this.User = User;
            this.ValidUntil = DateTime.Now.AddMinutes(VALIDITY_MINUTES);
        }

        public bool IsValid()
        {
            return DateTime.Now <= ValidUntil;
        }

        public string SessionId { get; set; }
        public UserModel User { get; set; }
        private DateTime ValidUntil { get; set; }

    }
}
