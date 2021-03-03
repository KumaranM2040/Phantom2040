using CardGame.Cards;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CardGame.Decks
{
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
}
