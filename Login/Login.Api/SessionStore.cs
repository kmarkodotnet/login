using Login.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Api
{
    public class SessionStore
    {
        private static Dictionary<string, Session> sessions = new Dictionary<string, Session>();

        public static void CreateSession(string sessionId, UserModel user)
        {
            sessions.Add(sessionId, new Session(sessionId, user));
        }
    }
}
