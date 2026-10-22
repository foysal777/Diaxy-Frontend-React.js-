from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import DriverEarning, PayoutRequest
from .serializers import DriverEarningSerializer, PayoutRequestSerializer

class EarningsSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.role != 'driver':
            return Response({'error': 'Only drivers can access earnings summary.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({
            'total_balance': float(user.wallet_balance),
            'today_earnings': float(user.today_earnings),
            'completed_trips': user.completed_trips,
            'rating': float(user.rating),
            'vehicle': user.vehicle_type,
            'reg_no': user.vehicle_reg_no
        }, status=status.HTTP_200_OK)

class EarningsHistoryView(generics.ListAPIView):
    serializer_class = DriverEarningSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return DriverEarning.objects.filter(driver=user)

class PayoutRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = PayoutRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PayoutRequest.objects.filter(driver=user)
