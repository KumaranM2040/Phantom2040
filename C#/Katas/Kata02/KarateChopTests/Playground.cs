using NUnit.Framework;
using System.Linq;

namespace KarateChopTests
{
    [TestFixture]
    public class Playground
    {
        [Test]
        public void FindStringInArray()
        {
            string[] a1 = new string[] { "arp", "live", "strong" };
            string[] a2 = new string[] { "lively", "alive", "harp", "sharp", "armstrong" };
            string[] r = new string[] { "arp", "live", "strong" };
            Assert.AreEqual(r, inArray(a1, a2));
        }

        public static string[] inArray(string[] array1, string[] array2)
        {
            var a = array1.Where(x => array2.Any(y => y.Contains(x))).OrderBy(z => z).ToArray();
            return a;
        }
    }
}
