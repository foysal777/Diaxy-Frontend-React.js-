from django.db import models
from django.conf import settings

class Vehicle(models.Model):
    TYPE_CHOICES = (
        ('pickup', 'Pickup Truck'),
        ('van', 'Van'),
        ('mini_box', 'Mini Box Truck'),
        ('box_truck_26', '26-foot Box truck'),
    )

    id_name = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)
    name = models.CharField(max_length=100)
    price_display = models.CharField(max_length=50, default='$42.92 + $1.62')
    unit = models.CharField(max_length=50, default='per labor min')
    image_url = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Driver Acceptance'),
        ('accepted', 'Driver En Route to Pickup'),
        ('loading', 'Loading Goods'),
        ('in_transit', 'In Transit to Destination'),
        ('delivered', 'Delivered & Completed'),
        ('cancelled', 'Cancelled'),
    )

    PAYMENT_CHOICES = (
        ('cash', 'Cash on Delivery'),
        ('bkash', 'bKash'),
        ('nagad', 'Nagad'),
        ('card', 'Credit/Debit Card'),
    )

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_moves')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='bookings')

    pickup_address = models.CharField(max_length=255, default='Road 27, Dhanmondi, Dhaka')
    drop_address = models.CharField(max_length=255, default='Gulshan 1, Avenue 1, Dhaka')
    estimated_distance_km = models.DecimalField(max_digits=6, decimal_places=1, default=9.8)
    estimated_duration_mins = models.PositiveIntegerField(default=35)
    total_fare = models.DecimalField(max_digits=10, decimal_places=2, default=1450.00)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='cash')
    items_description = models.TextField(blank=True, default='Household furniture and boxes')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Booking #{self.id}: {self.pickup_address} -> {self.drop_address} ({self.status})"
