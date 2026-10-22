from django.contrib import admin
from django.urls import path, include
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    return Response({
        'title': 'Digaxy Moving & Transport Platform API',
        'status': 'online',
        'version': '1.0.0',
        'endpoints': {
            'auth': {
                'login': '/api/auth/login/',
                'register': '/api/auth/register/',
                'profile': '/api/auth/profile/',
                'token_refresh': '/api/auth/refresh/',
                'change_password': '/api/auth/change-password/',
                'driver_status': '/api/auth/driver-status/',
            },
            'bookings': {
                'vehicles': '/api/vehicles/',
                'my_bookings': '/api/bookings/',
                'available_dispatches': '/api/bookings/available/',
            },
            'earnings': {
                'summary': '/api/earnings/summary/',
                'history': '/api/earnings/history/',
                'payouts': '/api/earnings/payouts/',
            }
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api_root'),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('bookings.urls')),
    path('api/earnings/', include('earnings.urls')),
]
