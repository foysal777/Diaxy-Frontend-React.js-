from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'Normal User'),
        ('driver', 'Driver'),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    phone = models.CharField(max_length=25, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, default='Road 27, Dhanmondi, Dhaka')
    avatar_url = models.CharField(max_length=255, blank=True, default='/images/avatar.jpg')

    # Driver Specific Fields
    vehicle_type = models.CharField(max_length=50, blank=True, default='Pickup Truck')
    vehicle_reg_no = models.CharField(max_length=50, blank=True, default='Dhaka Metro-U 14-8921')
    is_online = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    completed_trips = models.PositiveIntegerField(default=0)
    wallet_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    today_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
