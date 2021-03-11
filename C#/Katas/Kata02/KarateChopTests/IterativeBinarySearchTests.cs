using KarateChop;
using NUnit.Framework;
using System.Collections.Generic;

namespace KarateChopTests
{
    [TestFixture]
    public class IterativeBinarySearchTests
    {
        [Test]
        public void GivenDescendingSortedList_ReturnsCorrectIndex()
        {
            // Arrange
            var valueToFind = 14;
            var searchEngine = CreateSearchEngineWithSortedList(new[] { 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 }, false);

            // Act
            var result = searchEngine.FindIndexAtValue(valueToFind);

            // Assert
            Assert.That(result, Is.EqualTo(7));
        }

        [Test]
        public void GivenListOfOneItem_ReturnsCorrectIndex()
        {
            // Arrange
            var valueToFind = 20;
            var searchEngine = CreateSearchEngineWithSortedList(new[] { 20 }, false);

            // Act
            var result = searchEngine.FindIndexAtValue(valueToFind);

            // Assert
            Assert.That(result, Is.EqualTo(1));
        }

        [Test]
        public void GivenListOfOneItem_ReturnsNotFoundIndex()
        {
            // Arrange
            var valueToFind = 1;
            var searchEngine = CreateSearchEngineWithSortedList(new[] { 20 }, false);

            // Act
            var result = searchEngine.FindIndexAtValue(valueToFind);

            // Assert
            Assert.That(result, Is.EqualTo(-1));
        }


        [Test]
        public void GivenAscendingSortedList_ReturnsCorrectIndex()
        {
            // Arrange
            var valueToFind = 14;
            var searchEngine = CreateSearchEngineWithSortedList(new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 }, true);

            // Act
            var result = searchEngine.FindIndexAtValue(valueToFind);
            
            // Assert
            Assert.That(result, Is.EqualTo(14));
        }


        private IBinarySearch CreateSearchEngineWithSortedList(IEnumerable<int> searchList, bool sortOrderAscending)
        {
            return new Iterative(searchList, sortOrderAscending);
        }
    }
}
