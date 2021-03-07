from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from google.oauth2 import id_token #provied by google
from google.auth.transport import requests
from django.contrib.auth.models import User

import json
# Create your views here.
# also enable the CsrfViewMiddleware which i have disabled without any reason .
def googleLogin(request):#api by google to validate token
    temp = json.loads(request.body)
    token=temp['token']
    print(token)
    try:
        userInfo = id_token.verify_oauth2_token(token, requests.Request(), "450857265760-h4n07vma47ofqrna2ktclm5rvgg3f24l.apps.googleusercontent.com")
        print(userInfo)
        #do you database check with userInfo['email'] and act accordingly
        return HttpResponse("Invalid token",status='200')
    except ValueError:
         # throws valueerror if Invalid token
        return HttpResponse("Invalid token",status='401')
