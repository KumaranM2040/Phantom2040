using System;
using System.Collections.Generic;
using System.Linq;

namespace CardGame
{
    public enum Suit
    {
        Diamonds,
        Hearts,
        Spades,
        Clubs
    }

    public enum CardType
    {
        Ace = 1,
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5,
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9,
        Ten = 10,
        Jack = 11,
        Queen = 12,
        King = 13
    }

    public enum PlayerNames
    {
        Zenia, 
        Kezia,
        Eston,
        Kumaran
    }

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

    public class Deck
    {
        public Deck(List<Card> cards, Guid deckId)
        {
            Cards = cards;
            OriginalCards = new List<Card>(cards);
            DeckId = deckId;
            randomiser = new Random();
        }

        public List<Card> Cards { get; set; }
        public List<Card> OriginalCards { get; set; }
        public Guid DeckId { get; set; }
        private Random randomiser { get; set; }
        public void Shuffle(int rounds)
        {
            
            randomiser.Next();
            for (int i = 0; i < rounds; i++)
            {
                var shuffledCards = new List<Card>(Cards.OrderBy(x => randomiser.Next()).ToList());
                Cards.RemoveAll(x => true);
                OriginalCards.RemoveAll(x => true);
                foreach (var item in shuffledCards)
                {
                    Cards.Add(item);
                    OriginalCards.Add(item);
                }
                //int a = 0;
                //foreach (var card in Cards)
                //{
                //    a++;
                //    Console.WriteLine($"\nShuffled deck: {card.Name} of {card.SuitValue.ToString()} with value {card.Value} Count: {a}");
                //}
            }
        }
    }

    public class Player
    {
        public Player(Guid deckId, string playerName)
        {
            Cards = new List<Card>();
            DeckId = deckId;
            PlayerName = playerName;
        }
        public string PlayerName { get; set; }
        public Guid DeckId { get; set; }
        public List<Card> Cards { get; set; }
        public bool IsDealer { get; set; }
        public bool StopReceivingCards { get; set; }
    }

    public class GameA
    {
        public GameA(int numberOfDecksInGame, int numberOfCardsPerDeck = 52)
        {
            GameDeck = new List<Deck>(numberOfDecksInGame);
            for (int j = 0; j < numberOfDecksInGame; j++)
            {
                var deck = new Deck(new List<Card>(numberOfCardsPerDeck), Guid.NewGuid());
                foreach (var item in Enum.GetValues(typeof(Suit)))
                {
                    foreach (var type in Enum.GetValues(typeof(CardType)))
                    {
                        deck.Cards.Add(new Card((Suit)item, (int)type >= 10 ? 10 : (int) type, Guid.NewGuid(), type.ToString()));
                    }
                }
                GameDeck.Add(deck);
            }
        }
        public List<Deck> GameDeck { get; set; }

    }
}
