from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        '''Set up testing config before each test'''
        app.config['TESTING'] = True

    def test_game_home(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['games_played'] = 10

            resp = client.get('/')

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['games_played'], 11)

    # def test_check_valid_word(self):
    #     with app.test_client() as client:
    #         resp = client.post("/ans-sub", data= {'Answer': 'wordaeithaet'})

    #         html = resp.get_data(as_text=True)

    #         self.assertEqual(resp.status_code, 200)
            # self.assertIs(resp.data['Answer'], "not-word")
