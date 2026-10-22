from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    ChangePasswordSerializer,
    DriverStatusSerializer,
    CustomTokenObtainPairSerializer,
)

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'message': f"{user.get_role_display()} registered successfully!",
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'error': 'Current password is not correct.'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'message': 'Password updated successfully!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DriverStatusToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'driver':
            return Response({'error': 'Only drivers can toggle availability status.'}, status=status.HTTP_403_FORBIDDEN)
        
        is_online = request.data.get('is_online')
        if is_online is None:
            user.is_online = not user.is_online
        else:
            user.is_online = bool(is_online)
        user.save()

        return Response({
            'message': 'Driver status updated successfully.',
            'is_online': user.is_online
        }, status=status.HTTP_200_OK)
