import random
from rest_framework.exceptions import ValidationError
from .models import EmailOTP
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model
from django.db import transaction

def generate_otp_code(length: int = 6) -> str:
    max_number = 10**length - 1
    return f"{random.randint(0, max_number):0{length}d}"


def create_signup_otp(email: str) -> EmailOTP:
    EmailOTP.objects.filter(email=email, purpose="signup", is_used=False).update(is_used=True)

    code = generate_otp_code()

    otp = EmailOTP.objects.create(email=email, code=code, purpose="signup")
    return otp


def send_otp_email(email: str, code: str) -> None:
    send_mail("Your verification code", f"Your verification code is: {code}", settings.DEFAULT_FROM_EMAIL, [email])


def send_signup_code(email: str) -> EmailOTP:
    otp = create_signup_otp(email)
    send_otp_email(email, otp.code)
    return otp


def verify_signup_code(
    *,
    email: str,
    code: str,
    username: str,
    password: str,
    first_name: str = "",
    last_name: str = "",
    ):
    otp = EmailOTP.objects.filter(email=email, purpose="signup").order_by("-created_at").first()

    if otp is None:
        raise ValidationError({"code": "No verification code found for this email."})

    if otp.is_used:
        raise ValidationError({"code": "This verification code has already been used."})

    if timezone.now() > otp.created_at + timedelta(minutes=5):
        raise ValidationError({"code": "This verification code has expired."})

    if otp.code != code:
        raise ValidationError({"code": "Invalid verification code."})

    with transaction.atomic():
        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        otp.is_used = True
        otp.save(update_fields=["is_used"])

    return user
