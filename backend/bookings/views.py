from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Vehicle, Booking
from .serializers import VehicleSerializer, BookingSerializer, BookingStatusUpdateSerializer
from earnings.models import DriverEarning

class VehicleListView(generics.ListAPIView):
    queryset = Vehicle.objects.filter(is_active=True)
    serializer_class = VehicleSerializer
    permission_classes = [permissions.AllowAny]

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'driver':
            return Booking.objects.filter(driver=user)
        return Booking.objects.filter(customer=user)

class BookingDetailView(generics.RetrieveAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'driver':
            return Booking.objects.filter(driver=user)
        return Booking.objects.filter(customer=user)

class AvailableDispatchesView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Pending moves waiting for a driver
        return Booking.objects.filter(status='pending', driver__isnull=True)

class AcceptBookingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        driver = request.user
        if driver.role != 'driver':
            return Response({'error': 'Only registered drivers can accept moves.'}, status=status.HTTP_403_FORBIDDEN)

        booking = get_object_or_404(Booking, pk=pk)
        if booking.driver is not None or booking.status != 'pending':
            return Response({'error': 'This move request has already been assigned or completed.'}, status=status.HTTP_400_BAD_REQUEST)

        booking.driver = driver
        booking.status = 'accepted'
        booking.save()

        return Response({
            'message': f"Move #{booking.id} accepted successfully!",
            'booking': BookingSerializer(booking).data
        }, status=status.HTTP_200_OK)

class UpdateBookingStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        driver = request.user
        booking = get_object_or_404(Booking, pk=pk)

        if driver.role != 'driver' or booking.driver != driver:
            return Response({'error': 'You are not authorized to update this booking.'}, status=status.HTTP_403_FORBIDDEN)

        new_status = request.data.get('status')
        valid_statuses = ['accepted', 'loading', 'in_transit', 'delivered', 'cancelled']
        if new_status not in valid_statuses:
            return Response({'error': f"Invalid status. Choose from: {valid_statuses}"}, status=status.HTTP_400_BAD_REQUEST)

        previous_status = booking.status
        booking.status = new_status
        booking.save()

        # If marked delivered, update driver earnings and stats!
        if new_status == 'delivered' and previous_status != 'delivered':
            DriverEarning.objects.create(
                driver=driver,
                booking=booking,
                amount=booking.total_fare,
                description=f"Move #{booking.id}: {booking.pickup_address} -> {booking.drop_address}"
            )
            driver.wallet_balance += booking.total_fare
            driver.today_earnings += booking.total_fare
            driver.completed_trips += 1
            driver.save()

        return Response({
            'message': f"Status updated to '{new_status}'.",
            'booking': BookingSerializer(booking).data
        }, status=status.HTTP_200_OK)
