using System;

namespace CardGame.Cards
{
    public class Card
    {
        public Card(Suit suitValue, int value, Guid id, string name)
        {
            SuitValue = suitValue;
            Value = value;
            Id = id;
            Name = name;
        }

        public Suit SuitValue { get; set; }
        public int Value { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool CardTaken { get; set; }
    }
}
