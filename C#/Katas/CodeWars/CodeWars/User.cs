using System;
using System.Linq;

namespace CodeWars
{
    public class User
    {
        private int[] _validRank;
        private int _currentRankIndex;

        public int rank { 
            get 
            {
                return _validRank[_currentRankIndex];
            }
        }
        
        public int progress { get; private set; }


        public User()
        {
            _validRank = new[] { -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 };
            _currentRankIndex = 0;
            progress = 0;
        }

        public User(int initialRanking)
        {
            _validRank = new[] { -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8 };
            if (!_validRank.Contains(initialRanking))
            {
                throw new ArgumentException($"Invalid initial Ranking {initialRanking} provided");
            }
            _currentRankIndex = Array.FindIndex(_validRank, z => z==initialRanking);
            progress = 0;
        }

        public void incProgress (int inputRank)
        {
            if (!_validRank.Contains(inputRank))
            {
                throw new ArgumentException($"User called with invalid rank {inputRank}");
            }

            var inputRankIndex = getRankIndex(inputRank);
            if (inputRankIndex == _currentRankIndex)
            {
                updateProgress(3);
            }
            else if (inputRankIndex == _currentRankIndex-1 )
            {
                updateProgress(1);
            }
            else if (inputRankIndex < _currentRankIndex-1 )
            {
                //ignore 
            } 
            else if (inputRankIndex > _currentRankIndex)
            {
                var difference = inputRankIndex - _currentRankIndex;
                var progressPoints = 10 * difference * difference;
                updateProgress(progressPoints);
            }
        }

        private void updateProgress(int progressPoints)
        {
            if (isMaxRank())
            {
                progress = 0;
                return;
            }

            if (progress + progressPoints >= 100)
            {
                _currentRankIndex++;
                if (isMaxRank())
                {
                    progress = 0;
                    return;
                }
                progress = progress + progressPoints - 100;
                if (progress >= 100)
                {
                    updateProgress(0);
                }
            }
            else
            {
                progress = progress + progressPoints;
            }
        }

        private int getRankIndex(int rank)
        {
            return Array.FindIndex(_validRank, x => x == rank);
        }

        private bool isMaxRank()
        {
            return _currentRankIndex == _validRank.Length - 1;
        }
    }
}
