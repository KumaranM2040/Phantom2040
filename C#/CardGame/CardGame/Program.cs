using System;
using System.Collections.Generic;
using System.Linq;

namespace CardGame
{
    class Program
    {
        private static GameA gameA;
        private static List<Player> players;
        static void Main(string[] args)
        {
            Console.WriteLine("Hello Gaming World!");
            CreateGame();
            CreatePlayers();
            while(gameA.GameDeck[0].Cards.Count>0)
            {
                if (!DealPlayersRound())
                {
                    DealersRound();
                    break;
                }
            }
            CalculateWinner();
            Console.WriteLine("Game over !!");
            var gameOver = Console.ReadKey().KeyChar;
        }

        private static void DealersRound()
        {
            foreach (var player in players.Where(x => x.IsDealer))
            {
                while (player.Cards.Sum(x => x.Value) < 17 && gameA.GameDeck[0].Cards.Count>0)
                {
                    TakeCard(player);
                }
                Console.Write($"\n{player.PlayerName} (Dealer): Current Card Total is {player.Cards.Sum(x => x.Value)}");
            }
        }

        private static bool DealPlayersRound()
        {
            bool isPlayersInTheGame = false;
            foreach (var player in players.Where(x => !x.IsDealer && !x.StopReceivingCards))
            {
                char doYouWantACard = 'Y';
                if (player.Cards.Count > 0)
                {
                    Console.Write($"\n{player.PlayerName} : Current Card Total is {player.Cards.Sum(x => x.Value)} : Do you want a card ? (Y/N)");
                    doYouWantACard = Console.ReadKey().KeyChar;
                }

                if (char.ToUpperInvariant(doYouWantACard) == 'Y')
                {
                    TakeCard(player);
                }
                else
                {
                    player.StopReceivingCards = true;
                }
                isPlayersInTheGame = true;
            }
            return isPlayersInTheGame;

        }

        private static void TakeCard(Player player)
        {
            var cards = gameA.GameDeck[0].Cards.Where(x => !x.CardTaken).Take(1);
            if (!cards.Any())
            {
                return;
            }
            var card = cards.FirstOrDefault();
            player.Cards.Add(card);
            gameA.GameDeck[0].Cards.RemoveAll(x => x.Id == card.Id);
            Console.WriteLine($"\nPlayer {player.PlayerName} got a {card.Name} of {card.SuitValue.ToString()} with value {card.Value}");
        }

        private static void CalculateWinner()
        {
            var playersByTotal = players.OrderByDescending(x => x.Cards.Sum(y => y.Value));
            var playResults = new SortedDictionary<int, object>();
            bool firstPossibleWinner = false;
            Console.WriteLine("\n");
            foreach (var person in playersByTotal)
            {
                if (person.Cards.Sum(x => x.Value) <= 21)
                {
                    playResults.Add(person.Cards.Sum(y => y.Value), new { person.PlayerName, Total = person.Cards.Sum(y => y.Value), PossibleWinner = true});
                    //Console.WriteLine($"PossibleWinner is {person.PlayerName} with score {person.Cards.Sum(y => y.Value)}");
                }
                else
                {
                    playResults.Add(person.Cards.Sum(y => y.Value), new { person.PlayerName, Total = person.Cards.Sum(y => y.Value), PossibleWinner = false });
                    //Console.WriteLine($"Losers is {person.PlayerName} with score {person.Cards.Sum(y => y.Value)}");
                }
            }
            foreach (var item in playResults.Values.OrderBy(x => (bool)x.GetType().GetProperty("PossibleWinner").GetValue(x)).Select(y => y))
            {
                Console.WriteLine($"");
            }
                foreach (var item in playResults.Values.OrderBy(x => (bool)x.GetType().GetProperty("PossibleWinner").GetValue(x)).Select(y => y))
            {
                var result = (bool)item.GetType().GetProperty("PossibleWinner").GetValue(item) && !firstPossibleWinner ? "Winner" : "Loser" ;
                var name = (string)item.GetType().GetProperty("PlayerName").GetValue(item);
                var score = (int)item.GetType().GetProperty("Total").GetValue(item);
                if (result == "Winner") {
                    firstPossibleWinner = true;
                }
                Console.WriteLine($"{result} is {name} with score {score}");
            }
            Console.WriteLine($"\nCards left in deck is {gameA.GameDeck[0].Cards.Count} {gameA.GameDeck[0].OriginalCards.Count}");
        }
        private static void CreatePlayers()
        {
            var numberOfPlayers = 4;
            players = new List<Player>();
            for (int i = 0; i < numberOfPlayers; i++)
            {
                players.Add(new Player(Guid.NewGuid(), $"{((PlayerNames)i).ToString()}"));
            }
            players.Last().IsDealer = true;
        }

        private static void CreateGame()
        {
            gameA = new GameA(1);
            foreach (var deck in gameA.GameDeck)
            {
                deck.Shuffle(1);
                foreach (var card in deck.Cards)
                {
                    Console.WriteLine($"Card : {card.Name}, Suit : {card.SuitValue.ToString()}");
                }
            }
        }
    }
}
