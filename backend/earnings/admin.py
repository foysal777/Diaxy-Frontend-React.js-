from django.contrib import admin
from .models import DriverEarning, PayoutRequest

@admin.register(DriverEarning)
class DriverEarningAdmin(admin.ModelAdmin):
    list_display = ('driver', 'amount', 'booking', 'created_at')
    search_fields = ('driver__email', 'description')

@admin.register(PayoutRequest)
class PayoutRequestAdmin(admin.ModelAdmin):
    list_display = ('driver', 'amount', 'method', 'account_number', 'status', 'created_at')
    list_filter = ('status', 'method')
    search_fields = ('driver__email', 'account_number')
