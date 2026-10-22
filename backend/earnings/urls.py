from django.urls import path
from .views import EarningsSummaryView, EarningsHistoryView, PayoutRequestListCreateView

urlpatterns = [
    path('summary/', EarningsSummaryView.as_view(), name='earnings_summary'),
    path('history/', EarningsHistoryView.as_view(), name='earnings_history'),
    path('payouts/', PayoutRequestListCreateView.as_view(), name='payout_requests'),
]
