using CardGame.Cards;
using System;
using System.Collections.Generic;

namespace CardGame
{
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

}
