from django.contrib import admin
from .models import Vehicle, Booking

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('name', 'id_name', 'price_display', 'unit', 'is_active')
    list_filter = ('is_active', 'id_name')

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'driver', 'vehicle', 'status', 'total_fare', 'pickup_address', 'drop_address', 'created_at')
    list_filter = ('status', 'payment_method', 'vehicle')
    search_fields = ('customer__email', 'driver__email', 'pickup_address', 'drop_address')
