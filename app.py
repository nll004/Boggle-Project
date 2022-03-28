from flask import Flask, render_template, jsonify, session, request
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

new_game = None

@app.route('/')
def game_home():
    '''Create a new game from Boggle class, store visits as games_played in cookie storage then load html page.'''
    global new_game
    new_game = Boggle()
    start_game = new_game.make_board()

    visit_count = session['games_played']

    if visit_count:
        visit_count = session['games_played']

    if not visit_count:
        visit_count = 0

    visit_count += 1
    session['games_played'] = visit_count

    return render_template('board.html', game=start_game)

@app.route('/ans-sub', methods=["POST"])
def handle_ans():
    '''Handle answer and return a JSON response of {"result": "ok"}
    vs {"result": "not-word"} or {"result": "not-on-board"}'''

    answer = request.json['Answer']
    check_answer = new_game.check_valid_word(new_game.board, answer)

    return jsonify({'result': check_answer})
