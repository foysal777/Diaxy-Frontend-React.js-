from django.urls import path
from .views import (
    VehicleListView,
    BookingListCreateView,
    BookingDetailView,
    AvailableDispatchesView,
    AcceptBookingView,
    UpdateBookingStatusView
)

urlpatterns = [
    path('vehicles/', VehicleListView.as_view(), name='vehicle_list'),
    path('bookings/', BookingListCreateView.as_view(), name='booking_list_create'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking_detail'),
    path('bookings/available/', AvailableDispatchesView.as_view(), name='available_dispatches'),
    path('bookings/<int:pk>/accept/', AcceptBookingView.as_view(), name='accept_booking'),
    path('bookings/<int:pk>/status/', UpdateBookingStatusView.as_view(), name='update_booking_status'),
]
