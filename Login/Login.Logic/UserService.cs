using Login.DataAccess;
using Login.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Login.Logic
{
    public class UserService
    {
        private DataContext _dc;
        public UserService()
        {
            _dc = new DataContext();
        }

        public User CreateUser(string email, string authenticationId)
        {
            return _dc.Users.Add(new Model.User() {Email = email, AuthenticationId = authenticationId });
        }

        public User GetUser(string email)
        {
            return _dc.Users.List().FirstOrDefault(u => u.Email == email);
        }

        public User GetUser(int id)
        {
            return _dc.Users.List().FirstOrDefault(u => u.Id == id);
        }
    }
}
