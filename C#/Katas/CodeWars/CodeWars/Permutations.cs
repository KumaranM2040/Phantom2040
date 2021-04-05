using System.Collections.Generic;
using System.Linq;

namespace CodeWars
{
    public class Permutations
    {
        public static List<string> SinglePermutations(string s)
        {

            var characters = s.ToCharArray().Distinct();
            var permutation = new char[s.Length];
            var uniquePermutations = new HashSet<string>();
            var lookup = new Dictionary<char, int>();
            foreach (var character in characters)
            {
                lookup.Add(character, s.ToCharArray().Count(x => x == character));
            }

            GetPermutations(permutation, characters.ToArray(), 0, s.Length, uniquePermutations);
            return uniquePermutations.Where(x => x.ToCharArray().All(z => x.ToCharArray().Count(y => y == z) == lookup[z])).ToList();
        }

        private static void GetPermutations(char[] permutation, char[] options, int index, int length, HashSet<string> permutations)
        {
            for (int i = 0; i < options.Length; i++)
            {
                if (index == length - 1)
                {
                    for (var j = 0; j < options.Length; j++)
                    {
                        permutation[index] = options[j];
                        permutations.Add(new string(permutation));
                    }
                    return;
                }
                permutation[index] = options[i];
                GetPermutations(permutation, options, index + 1, length, permutations);
            }
        }
    }
}
