from ninja import NinjaAPI, ModelSchema, Schema
from Blackjack.models import Game, Player
from Blackjack.services import create_game, get_players, change_score, get_winners
from typing import List

api = NinjaAPI()

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = [
            "id",
            "name",
            "score",
            "game",
        ]

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "turn",
            "ended",
        ]
    players: List[PlayerSchema]

class AddGameSchema(Schema):
    game_name: str
    players: List[str]

class GetPlayersSchema(Schema):
    id: int

class ScoreUpdateSchema(Schema):
    score: int

class WinnerSchema(Schema):
    player: PlayerSchema
    rank: int

@api.post("/create_game", response=GameSchema)
def add(request, add_game: AddGameSchema):
    return create_game(add_game.game_name, add_game.players)

@api.get("/get_players", response=List[PlayerSchema])
def get(request, id: int = None):
    return get_players(id)

@api.put("/change_score", response=PlayerSchema)
def put(request, data: ScoreUpdateSchema, player_id: int = None):
    return change_score(player_id, data.score)

@api.get("/get_winners", response=List[WinnerSchema])
def winners(request, game_id: int):
    return get_winners(game_id)