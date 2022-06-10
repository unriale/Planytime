import requests
from django.core.exceptions import ValidationError
from typing import Dict, Any
from decouple import config
import re


GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def get_tokens(data):
    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)

    if not response.ok:
        raise ValidationError('Failed to get access token from Google.')

    access_token = response.json()['access_token']
    try:
        refresh_token = response.json()['refresh_token']
    except:
        refresh_token = ''
    id_token = response.json()['id_token']

    tokens = {"access_token": access_token,
              "refresh_token": refresh_token, "id_token": id_token}

    return tokens


def google_get_tokens(*, code: str, redirect_uri: str) -> dict:

    data = {
        'code': code,
        'client_id': config('REACT_APP_CLIENT_ID'),
        'client_secret': config('REACT_APP_CLIENT_SECRET'),
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    return get_tokens(data)


def google_get_user_info(*, access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Failed to obtain user info from Google.')

    return response.json()


def google_refresh_access_token(refresh_token: str) -> dict:
    data = {
        'client_id': config('REACT_APP_CLIENT_ID'),
        'client_secret': config('REACT_APP_CLIENT_SECRET'),
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token'
    }
    return get_tokens(data)


