from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone', 'address', 'avatar_url',
            'vehicle_type', 'vehicle_reg_no', 'is_online',
            'rating', 'completed_trips', 'wallet_balance', 'today_earnings'
        ]
        read_only_fields = ['id', 'rating', 'completed_trips', 'wallet_balance', 'today_earnings']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'role', 'phone', 'address', 'vehicle_type', 'vehicle_reg_no']

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.get('username') or validated_data.get('email').split('@')[0]
        validated_data['username'] = username
        
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=6)

class DriverStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_online']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['email'] = user.email
        token['name'] = f"{user.first_name} {user.last_name}".strip() or user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
