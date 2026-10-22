from django.db import models
from django.conf import settings

class DriverEarning(models.Model):
    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='earnings')
    booking = models.ForeignKey('bookings.Booking', on_delete=models.SET_NULL, null=True, blank=True, related_name='earnings_record')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.driver.username} earned ৳{self.amount} on {self.created_at.strftime('%Y-%m-%d')}"

class PayoutRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Approval'),
        ('approved', 'Approved & Processing'),
        ('completed', 'Transferred Successfully'),
        ('rejected', 'Rejected'),
    )

    METHOD_CHOICES = (
        ('bkash', 'bKash'),
        ('nagad', 'Nagad'),
        ('bank', 'Bank Transfer'),
    )

    driver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payout_requests')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=METHOD_CHOICES, default='bkash')
    account_number = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Payout #{self.id} for {self.driver.username}: ৳{self.amount} ({self.status})"
