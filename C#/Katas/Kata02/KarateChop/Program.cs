using System;

namespace KarateChop
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            int [] input = new [] { 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 };
            var searchEngine = new Iterative(input, true);
            var result = searchEngine.FindIndexAtValue(11);
        }
    }
}
