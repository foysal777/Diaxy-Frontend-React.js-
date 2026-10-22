from rest_framework import serializers
from .models import DriverEarning, PayoutRequest

class DriverEarningSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverEarning
        fields = ['id', 'booking', 'amount', 'description', 'created_at']

class PayoutRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayoutRequest
        fields = ['id', 'amount', 'method', 'account_number', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_amount(self, value):
        user = self.context['request'].user
        if value <= 0:
            raise serializers.ValidationError("Withdrawal amount must be greater than zero.")
        if value > user.wallet_balance:
            raise serializers.ValidationError(f"Insufficient funds. Maximum withdrawable balance is ৳{user.wallet_balance}.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['driver'] = user
        user.wallet_balance -= validated_data['amount']
        user.save()
        return super().create(validated_data)
