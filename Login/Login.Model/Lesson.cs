using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.Model
{
    public class Lesson: Entity
    {
        public string Description { get; set; }
        public string LongDescription { get; set; }
        public string Tags { get; set; }
        public string Duration { get; set; }
        public string Url { get; set; }
        public string VideoUrl { get; set; }
    }

}
