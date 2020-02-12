using Login.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Login.DataAccess
{
    public class Repository<T>
        where T: Entity
    {
        protected static List<T> Items = new List<T>();
        protected static int maxId = 0;

        public T Add(T t)
        {
            t.Id = ++maxId;
            Items.Add(t);
            return t;
        }

        public T Get(int id)
        {
            return Items.FirstOrDefault(i => i.Id == id);
        }

        public void Remove(T t)
        {
            Items.Remove(t);
        }

        public IEnumerable<T> List()
        {
            return Items;
        }

        public void Init(IEnumerable<T> items)
        {
            if (Items == null || !Items.Any())
            {
                Items = items.ToList();
            }            
        }
    }
}
