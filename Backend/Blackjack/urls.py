from ninja import NinjaAPI, Schema, ModelSchema
from typing import List
from Blackjack.models import Game, Player
import random

api = NinjaAPI()


class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ["id", "name", "score", "rolls"]

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ["id", "name", "turn", "ended"]
    players: List[PlayerSchema]

class StartGameRequest(Schema):
    game_name: str
    players: List[str]  

class PlayGameRequest(Schema):
    action: str  
    diceCount: int

class GameState(Schema):
    players: List[PlayerSchema]
    currentPlayerIndex: int
    winners: List[str]


@api.post("/create_game/", response=GameSchema)
def start_game(request, data: StartGameRequest):
    game = Game.objects.create(name=data.game_name)
    for name in data.players:
        Player.objects.create(name=name, game=game, score=0, rolls=0)
    game.refresh_from_db()  
    return game


@api.post("/play_game/{game_id}/", response=GameState)
def play_game(request, game_id: int, data: PlayGameRequest):
    try:
        game = Game.objects.prefetch_related("players").get(id=game_id)
    except Game.DoesNotExist:
        return {"error": "Game not found"}, 404

    players = list(game.players.all())
    current_player_index = game.turn % len(players)
    winners = [player.name for player in players if player.score == 21]
    current_player = players[current_player_index]


    if data.action == "roll" and current_player.rolls < 3:
        roll_sum = sum(random.randint(1, 6) for _ in range(data.diceCount))
        current_player.score += roll_sum
        current_player.rolls += 1
        current_player.save()

        if current_player.score >= 21 or current_player.rolls == 3:
            if current_player.score == 21:
                winners.append(current_player.name)
            game.turn += 1  
            game.save()

    elif data.action == "end_turn":
        game.turn += 1  
        game.save()

    updated_players = [PlayerSchema.from_orm(player) for player in players]
    return GameState(players=updated_players, currentPlayerIndex=game.turn % len(players), winners=winners)


@api.post("/finish_game/{game_id}/", response=GameState)
def finish_game(request, game_id: int):
    try:
        game = Game.objects.prefetch_related("players").get(id=game_id)
    except Game.DoesNotExist:
        return {"error": "Game not found"}, 404

    players = list(game.players.all())
    winners = []

    
    max_score = max(p.score for p in players if p.score <= 21)
    winners = [p.name for p in players if p.score == max_score]

    
    game.ended = True
    game.save()

    updated_players = [PlayerSchema.from_orm(player) for player in players]
    return GameState(players=updated_players, currentPlayerIndex=game.turn % len(players), winners=winners)


@api.get("/get_winners/{game_id}/", response=List[str])
def get_winners(request, game_id: int):
    try:
        game = Game.objects.get(id=game_id)
    except Game.DoesNotExist:
        return {"error": "Game not found"}, 404

    if not game.ended:
        return {"error": "Game has not finished yet"}, 400

    players = list(game.players.all())
    max_score = max(p.score for p in players if p.score <= 21)
    winners = [p.name for p in players if p.score == max_score]

    return winners