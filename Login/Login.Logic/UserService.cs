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

        public User CreateUser(string email, string password)
        {
            var salt = Password.CreateSalt();
            var psw = Password.HashPassword(password, salt);
            return _dc.Users.Add(new Model.User() {Email = email, Password = psw, Salt = salt });
        }

        public User GetUser(string email)
        {
            return _dc.Users.List().FirstOrDefault(u => u.Email == email);
        }

        public bool ValidatePassword(string email, string password)
        {
            var user = _dc.Users.GetUserByEmail(email);
            return Password.VerifyHash(password, user.Salt, user.Password);
        }


    }
}
