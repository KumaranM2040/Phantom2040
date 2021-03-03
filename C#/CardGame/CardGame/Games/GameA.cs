using CardGame.Cards;
using CardGame.Decks;
using System;
using System.Collections.Generic;

namespace CardGame.Games
{
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
                        deck.Cards.Add(new Card((Suit)item, (int)type >= 10 ? 10 : (int)type, Guid.NewGuid(), type.ToString()));
                    }
                }
                GameDeck.Add(deck);
            }
        }
        public List<Deck> GameDeck { get; set; }

    }
}
