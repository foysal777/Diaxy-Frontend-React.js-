from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'role', 'phone', 'is_online', 'is_staff')
    list_filter = ('role', 'is_online', 'is_staff', 'is_active')
    search_fields = ('email', 'username', 'phone', 'vehicle_reg_no')
    ordering = ('email',)

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Digaxy Profile & Role', {
            'fields': ('role', 'phone', 'address', 'avatar_url')
        }),
        ('Driver Specific Details', {
            'fields': ('vehicle_type', 'vehicle_reg_no', 'is_online', 'rating', 'completed_trips', 'wallet_balance', 'today_earnings')
        }),
    )
