using Login.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Login.DataAccess
{
    public class DataContext
    {
        public DataContext()
        {
            Lessons = new LessonRepository();
            Users = new UserRepository();
        }

        public static void Init()
        {
            new LessonRepository().Init(GetLessons());
        }

        public LessonRepository Lessons { get; set; }
        public UserRepository Users { get; set; }

        private static IEnumerable<Lesson> GetLessons()
        {
            var l1 = new Lesson();
            l1.Id = 1;
            l1.Description = "Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step";
            l1.LongDescription = "<p>This is step by step guide to create your first  application. <b>Its aimed at beginners</b> just starting out with the framework.This lesson will show how to create a component; and how to link the component to a given custom HTML tag. It will show how to give the component a given template.</p>";
            l1.Tags = "BEGINNER";
            l1.Duration = "4=17";
            l1.Url = "https=//www.youtube.com/watch?v=LVrF-aQ6NxQ";
            l1.VideoUrl = "https=//www.youtube.com/embed/du6sKwEFrhQ";

            var l2 = new Lesson();
            l2.Id = 2;
            l2.Description = "Building Your First  Component - Component Composition";
            l2.Duration = "2=07";
            l2.LongDescription = "<p>In this lesson we are going to see how to include a component inside another component. We are going to create a simple search box component and include it in our main application.</p>";
            l2.Tags = "BEGINNER";
            l2.Url = "angular2-build-your-first-component";
            l2.VideoUrl = "https=//www.youtube.com/embed/VES1eTNxi1s";

            return new List<Lesson> { l1, l2 };
        }
    }
}
