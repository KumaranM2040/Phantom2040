using CodeWars;
using NUnit.Framework;
using System;

namespace CodeWarsTests
{
    [TestFixture]
    public class UserTests
    {
        [Test]
        public void GivenARankMinus8Activity_WithCurrentRankMinus8_ReturnProgress3()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(-8);

            // Assert
            Assert.AreEqual(3, sut.progress);
        }

        [Test]
        public void GivenARankMinus8Activity_WithCurrentRankMinus7_ReturnProgress1()
        {
            // Arrange
            var sut = new User(-7);

            // Act
            sut.incProgress(-8);

            // Assert
            Assert.AreEqual(1, sut.progress);
        }

        [Test]
        public void GivenARankMinus8Activity_WithCurrentRankMinus6_ReturnProgress0()
        {
            // Arrange
            var sut = new User(-6);

            // Act
            sut.incProgress(-8);

            // Assert
            Assert.AreEqual(0, sut.progress);
        }

        [Test]
        public void GivenARankMinus7Activity_WithCurrentRankMinus8_ReturnProgress10()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(-7);

            // Assert
            Assert.AreEqual(10, sut.progress);
        }

        [Test]
        public void GivenARankMinus6Activity_WithCurrentRankMinus8_ReturnProgress40()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(-6);

            // Assert
            Assert.AreEqual(40, sut.progress);
        }


        [Test]
        public void GivenARankMinus5Activity_WithCurrentRankMinus8_ReturnProgress90()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(-5);

            // Assert
            Assert.AreEqual(90, sut.progress);
        }

        [Test]
        public void GivenARankMinus4Activity_WithCurrentRankMinus8_ReturnProgress60()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(-4);

            // Assert
            Assert.AreEqual(-7, sut.rank);
            Assert.AreEqual(60, sut.progress);
        }


        [Test]
        public void GivenARank1Activity_WithCurrentRankMinus1_ReturnProgress10()
        {
            // Arrange
            var sut = new User(-1);

            // Act
            sut.incProgress(1);

            // Assert
            Assert.AreEqual(10, sut.progress);
            Assert.AreEqual(-1, sut.rank);
        }

        [Test]
        public void GivenARank8Activity_WithCurrentRankMinus8_ReturnProgress10()
        {
            // Arrange
            var sut = new User();

            // Act
            sut.incProgress(8);

            // Assert
            Assert.AreEqual(0, sut.progress);
            Assert.AreEqual(8, sut.rank);
        }

        [TestCase(-9)]
        [TestCase(0)]
        [TestCase(9)]
        public void GivenAInvalidRanks_WithCurrentRankMinus8_ReturnArgumentException(int rank)
        {
            // Arrange
            var sut = new User();

            // Act
            Assert.Throws(typeof(ArgumentException), () => {
                sut.incProgress(rank);
            });
        }
    }
}
