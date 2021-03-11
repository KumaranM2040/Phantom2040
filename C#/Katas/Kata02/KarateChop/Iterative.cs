using System.Collections.Generic;
using System.Linq;

namespace KarateChop
{
    public class Iterative : IBinarySearch
    {
        private static IEnumerable<int> _sortedList;
        private static bool _sortOrder;

        public Iterative(IEnumerable<int> sortedList, bool ascending)
        {
            _sortedList = sortedList;
            _sortOrder = ascending;
        }

        public bool DoesValueExist(int searchValue)
        {
            return FindIndexAtValue(searchValue) != -1;
        }

        public int FindIndexAtValue(int searchValue)
        {
            int min = 0;
            int max = _sortedList.Count() - 1;
            while (min <= max)
            {
                int mid = (min + max) / 2;
                if (searchValue == _sortedList.ElementAt(mid))
                {
                    return ++mid;
                }
                
                if (IsSearchValueLessThanMidpoint(searchValue, mid))
                {
                    max = mid - 1;
                }
                else
                {
                    min = mid + 1;
                }
            }
            return -1;
        }

        private bool IsSearchValueLessThanMidpoint(int searchValue, int midpoint)
        {
            if (_sortOrder)
            {
                return searchValue < _sortedList.ElementAt(midpoint);
            }
            else 
            {
                return searchValue > _sortedList.ElementAt(midpoint);
            }
        }
    }
}
