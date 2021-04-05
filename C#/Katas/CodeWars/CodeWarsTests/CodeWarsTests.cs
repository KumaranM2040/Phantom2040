using CodeWars;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeWarsTests
{
    [TestFixture]
    public class CodeWarsTests
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
            foreach (var item in valueOccurrenceLookUp)
            {
                var count = 0;
                for (var i = 0; i < inputList.Count; i++)
                {
                    if (inputList[i] == item.Key)
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
        public void ParenthesesTest1()
        {
            Assert.AreEqual(true, ValidParentheses("()"));
        }

        [Test]
        public void ParenthesesTest2()
        {
            Assert.AreEqual(false, ValidParentheses(")(((("));
        }

        public static bool ValidParentheses(string input)
        {
            var brackets = input.ToCharArray().Where(x => x == ')' || x == '(').ToArray();
            var unPairedBracket = 0;
            for (var i = 0; i < brackets.Count(); i++)
            {
                var isOpeningBracket = brackets[i] == '(';
                if (isOpeningBracket)
                {
                    unPairedBracket++;
                }
                else
                {
                    if (unPairedBracket == 0)
                    {
                        return false;
                    }
                    unPairedBracket--;
                }
            }
            return unPairedBracket == 0;
        }


        [Test]
        public void TicketsTest1()
        {
            int[] peopleInLine = new int[] { 25, 25, 50, 50 };
            Assert.AreEqual("YES", Tickets(peopleInLine));
        }

        [Test]
        public void TicketsTest2()
        {
            int[] peopleInLine = new int[] { 25, 100 };
            Assert.AreEqual("NO", Tickets(peopleInLine));
        }

        public static string Tickets(int[] peopleInLine)
        {
            var NumberOf25DollarBills = new List<int>();
            var NumberOf50DollarBills = new List<int>();

            for (var i = 0; i < peopleInLine.Length; i++)
            {

                switch (peopleInLine[i])
                {
                    case 25:
                        NumberOf25DollarBills.Add(1);
                        break;

                    case 50:
                        {
                            if (!CanGiveChange(NumberOf25DollarBills, NumberOf50DollarBills, 25))
                            {
                                return "NO";
                            }
                            NumberOf50DollarBills.Add(1);

                        }
                        break;

                    case 100:
                        {
                            if (!CanGiveChange(NumberOf25DollarBills, NumberOf50DollarBills, 75))
                            {
                                return "NO";
                            }
                        }
                        break;
                }
            }
            return "YES";
        }
        private static bool CanGiveChange(List<int> numberOf25s, List<int> numberOf50s, int requiredChange)
        {
            if (requiredChange == 75)
            {
                if ((numberOf50s.Count > 0) && (numberOf25s.Count > 0))
                {
                    numberOf50s.Remove(1);
                    numberOf25s.Remove(1);
                    return true;
                }

                if (numberOf25s.Count >= 3)
                {
                    numberOf25s.RemoveRange(0, 3);
                    return true;
                }
            }

            if (requiredChange == 25)
            {
                if (numberOf25s.Count >= 1)
                {
                    numberOf25s.Remove(1);
                    return true;
                }
            }
            return false;
        }


        [Test]
        public static void ScrambleTest1()
        {
            testing(Scramble("rkqodlw", "world"), true);
            testing(Scramble("cedewaraaossoqqyt", "codewars"), true);
            testing(Scramble("katas", "steak"), false);
            testing(Scramble("scriptjavx", "javascript"), false);
            testing(Scramble("scriptingjava", "javascript"), true);
            testing(Scramble("scriptsjava", "javascripts"), true);
            testing(Scramble("javscripts", "javascript"), false);
            testing(Scramble("aabbcamaomsccdd", "commas"), true);
            testing(Scramble("commas", "commas"), true);
            testing(Scramble("sammoc", "commas"), true);
        }

        private static void testing(bool actual, bool expected)
        {
            Assert.AreEqual(expected, actual);
        }

        public static bool Scramble(string str1, string str2)
        {
            var characterDictionary = new Dictionary<char, int>();
            foreach (var character in str1.ToCharArray().Distinct())
            {
                characterDictionary.Add(character, str1.Count(y => y == character));
            }
            bool result = false;
            try
            {
                result = str2.ToCharArray().Distinct().All(x => str2.Count(y => y == x) <= characterDictionary[x]);
            }
            catch
            {
            };

            return result;
        }

        [Test]
        public void Example1()
        {
            
            Assert.AreEqual(new List<string> { "a" }, Permutations.SinglePermutations("a").OrderBy(x => x).ToList());
        }

        [Test]
        public void Example2()
        {
            Assert.AreEqual(new List<string> { "ab", "ba" }, Permutations.SinglePermutations("ab").OrderBy(x => x).ToList());
        }

        [Test]
        public void Example3()
        {
            Assert.AreEqual(new List<string> { "aabb", "abab", "abba", "baab", "baba", "bbaa" }, Permutations.SinglePermutations("aabb").OrderBy(x => x).ToList());
        }

    }
}
