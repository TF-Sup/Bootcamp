from Blackjack.models import Game, Player
from django.core.exceptions import ObjectDoesNotExist

def create_game(game_name: str, players: list[str]):
    game = Game(name=game_name)
    game.save()
    for name in players:
        Player.objects.create(name=name, game=game)
    return game

def get_players(game_id):
    game = Game.objects.get(id=game_id)
    players = game.players.all()
    return players

def change_score(player_id, score):
    try:
        player = Player.objects.get(id=player_id)
        player.score = score
        player.save()
        return player
    except ObjectDoesNotExist:
        return None

def get_winners(game_id):
    game = Game.objects.get(id=game_id)
    under_21_players = game.players.filter(score__lte=21).order_by('-score')
    over_21_players = game.players.filter(score__gt=21).order_by('score')

    winners = []
    current_rank = 1
    previous_score = None

    for player in under_21_players:
        if player.score != previous_score:
            current_rank = len(winners) + 1
        winners.append({
            "player": player,
            "rank": current_rank
        })
        previous_score = player.score

    more_than_21 = len(winners) + 1
    for player in over_21_players:
        winners.append({
            "player": player,
            "rank": more_than_21
        })
        more_than_21 += 1

    return winners