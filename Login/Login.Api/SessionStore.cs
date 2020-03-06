using Login.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Api
{
    //public class SessionStore
    //{
    //    private static Dictionary<string, Session> sessions = new Dictionary<string, Session>();

    //    public static void CreateSession(string sessionId, UserModel user)
    //    {
    //        sessions.Add(sessionId, new Session(sessionId, user));
    //    }

    //    public static UserModel FindUserBySessionId(string sessionId)
    //    {
    //        return IsValid(sessionId) ? sessions[sessionId].User : null;
    //    }

    //    public static bool IsValid(string sessionId)
    //    {
    //        return sessions.ContainsKey(sessionId) && sessions[sessionId].IsValid();
    //    }

    //    public static void DestroySession(string sessionId)
    //    {
    //        if (sessions.ContainsKey(sessionId))
    //        {
    //            sessions.Remove(sessionId);
    //        }
    //    }
    //}
}
