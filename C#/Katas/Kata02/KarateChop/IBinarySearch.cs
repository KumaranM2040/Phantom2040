using System.Collections.Generic;

namespace KarateChop
{
    public interface IBinarySearch
    {
        public bool DoesValueExist(int searchValue);
        
        public int FindIndexAtValue(int searchValue);
    }
}
