using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        [Test]
        public void EnoughIsEnough()
        {
            var expected = new int[] { 1, 1, 3, 3, 7, 2, 2, 2 };

            var actual = DeleteNth(new int[] { 1, 1, 3, 3, 7, 2, 2, 2, 2, 2 }, 3);

            CollectionAssert.AreEqual(expected, actual);
        }

        public static int[] DeleteNth(int[] arr, int x)
        {
            var valueOccurrenceLookUp = new Dictionary<int, int>();
            var inputList = new List<int>(arr);
            foreach (var item in arr.Distinct())
            {
                var e = arr.Count(y => y == item);
                if (e > x)
                {
                    valueOccurrenceLookUp.Add(item, e);
                }
            }
            foreach(var item in valueOccurrenceLookUp)
            {
                var count = 0;
                for (var i = 0; i < inputList.Count; i++)
                {
                    if(inputList[i] == item.Key)
                    {
                        count++;
                        if (count > x)
                        {
                            inputList.RemoveAt(i);
                            count--;
                            i--;
                        }
                    }
                }
            }
            return inputList.ToArray();

        }

        [TestCase(1, "I")]
        [TestCase(2, "II")]
        [TestCase(4, "IV")]
        [TestCase(500, "D")]
        [TestCase(1000, "M")]
        [TestCase(1954, "MCMLIV")]
        [TestCase(1990, "MCMXC")]
        [TestCase(2008, "MMVIII")]
        [TestCase(2014, "MMXIV")]
        public void RomanNumeralsTest(int value, string expected)
        {
            Assert.AreEqual(expected, ToRomanNumerals(value));
        }

        public static Dictionary<int, string> lookup = new Dictionary<int, string> {
            { 1   ,"I" },
            { 2   ,"II" },
            { 3   ,"III" },
            { 4   ,"IV" },
            { 5   ,"V" },
            { 6   ,"VI" },
            { 7   ,"VII" },
            { 8   ,"VIII" },
            { 9   ,"IX" },
            { 10  ,"X" },
            { 20  ,"XX" },
            { 30  ,"XXX" },
            { 40  ,"XL" },
            { 50  ,"L" },
            { 60 ,"LX" },
            { 70 ,"LXX" },
            { 80 ,"LXXX" },
            { 90 ,"XC" },
            { 100 ,"C" },
            { 200 ,"CC" },
            { 300 ,"CCC" },
            { 400 ,"CD" },
            { 500 ,"D" },
            { 600 ,"DC" },
            { 700 ,"DCC" },
            { 800 ,"DCCC" },
            { 900 ,"CM" },
            { 1000,"M" },
        };


        public static string ToRomanNumerals(int n)
        {
            var sb = new StringBuilder();
            DecimalToRomanPositionalValue(sb, n, lookup.Select(x => x.Key).Reverse().ToArray(), 0);
            return sb.ToString();
        }

        private static void DecimalToRomanPositionalValue(StringBuilder sb, int value, int[] decimalValue, int index)
        {
            if (index >= lookup.Count())
            {
                return; 
            }
            for (int i = 0; i < value / decimalValue[index]; i++)
            {
                sb.Append(lookup[decimalValue[index]]);
            }
            DecimalToRomanPositionalValue(sb, value % decimalValue[index], decimalValue, ++index);
        }

        [Test]
        public void CountBits()
        {
            Assert.AreEqual(0, CountBits(0));
            Assert.AreEqual(1, CountBits(4));
            Assert.AreEqual(3, CountBits(7));
            Assert.AreEqual(2, CountBits(9));
            Assert.AreEqual(2, CountBits(10));
        }

        public static int CountBits(int n)
        {
            var a = Convert.ToString(n, 2).ToCharArray().Count(x => x != '0');
            return a;
        }

        [Test]
        public void SampleTest1()
        {
            Assert.AreEqual(true, ValidParentheses("()"));
        }

        [Test]
        public void SampleTest2()
        {
            Assert.AreEqual(false, ValidParentheses(")(((("));
        }

        public static bool ValidParentheses(string input)
        {
            var brackets = input.ToCharArray().Where(x => x == ')' || x == '(').ToArray();
            var unPairedBracket = 0;
            for(var i=0; i < brackets.Count(); i++)
            {
                var isOpeningBracket = brackets[i] == '(';
                if (isOpeningBracket)
                {
                    unPairedBracket++;
                }
                else
                {
                    if(unPairedBracket == 0)
                    {
                        return false;
                    }
                    unPairedBracket--;
                }
            }
            return unPairedBracket==0;
        }
    }
}
