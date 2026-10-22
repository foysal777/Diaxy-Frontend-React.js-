from rest_framework import serializers
from .models import Vehicle, Booking
from accounts.serializers import UserSerializer

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'id_name', 'name', 'price_display', 'unit', 'image_url', 'description']

class BookingSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    driver = UserSerializer(read_only=True)
    vehicle_details = VehicleSerializer(source='vehicle', read_only=True)
    vehicle_id = serializers.PrimaryKeyRelatedField(
        queryset=Vehicle.objects.all(), source='vehicle', write_only=True
    )

    class Meta:
        model = Booking
        fields = [
            'id', 'customer', 'driver', 'vehicle', 'vehicle_id', 'vehicle_details',
            'pickup_address', 'drop_address', 'estimated_distance_km',
            'estimated_duration_mins', 'total_fare', 'payment_method',
            'items_description', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'customer', 'driver', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['customer'] = user
        return super().create(validated_data)

class BookingStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['status']
