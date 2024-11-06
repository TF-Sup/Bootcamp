from django.db import models
from game.models import Game, Player

def start_game(game_name: str, players: list[str]):
    game = Game.objects.create(name=game_name)
    
    for name in players:
        Player.objects.create(name=name, game=game)

def game_players(game_id):
    game = Game.objects.get(pk=game_id)
    players = game.players.all()
    return players


def update_score(player_id, score):
    player = Player.objects.get(pk=player_id)
    player.score=score
    player.save()
    return player