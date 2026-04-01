from django.urls import path
from .views import SendSignupCodeView, VerifySignupCodeView

app_name="accounts"

urlpatterns = [
    path('send-signup-code/', SendSignupCodeView.as_view(), name='send-signup-code'),
    path("verify-signup-code/", VerifySignupCodeView.as_view(), name="verify-signup-code"),
]


