using Login.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Login.DataAccess
{
    public class UserRepository : Repository<User>
    {
        public User GetUserByEmail(string email)
        {
            return Items.FirstOrDefault(i => i.Email == email);
        }
    }
}
