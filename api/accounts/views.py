from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .services import send_signup_code, verify_signup_code
from .serializers import SendSignupCodeSerializer, VerifySignupCodeSerializer


class SendSignupCodeView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = SendSignupCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        send_signup_code(email)

        return Response(
            {"message": "Verification code sent successfully."},
            status=status.HTTP_200_OK,
        )


class VerifySignupCodeView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = VerifySignupCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = verify_signup_code(
            email=serializer.validated_data["email"],
            code=serializer.validated_data["code"],
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
            first_name=serializer.validated_data.get("first_name", ""),
            last_name=serializer.validated_data.get("last_name", ""),
        )

        return Response(
            {
                "message": "User created successfully.",
                "user_id": user.id,
                "email": user.email,
                "username": user.username,
            },
            status=status.HTTP_201_CREATED,
        )
