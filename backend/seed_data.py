import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from bookings.models import Vehicle, Booking
from earnings.models import DriverEarning

User = get_user_model()

def seed():
    print("Seeding initial Digaxy data...")

    # 1. Superuser
    if not User.objects.filter(email='admin@digaxy.com').exists():
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@digaxy.com',
            password='admin1234',
            first_name='Digaxy',
            last_name='Admin',
            role='user'
        )
        print("✓ Created superuser: admin@digaxy.com / admin1234")

    # 2. Normal User (Joe Mitchell)
    user, created = User.objects.get_or_create(
        email='joemitchell016@gmail.com',
        defaults={
            'username': 'joemitchell',
            'first_name': 'Joe',
            'last_name': 'Mitchell',
            'role': 'user',
            'phone': '+880 1712-345678',
            'address': 'Road 27, Dhanmondi, Dhaka',
            'avatar_url': '/images/avatar.jpg'
        }
    )
    if created:
        user.set_password('pass1234')
        user.save()
        print("✓ Created normal user: joemitchell016@gmail.com / pass1234")

    # 3. Driver (Rakib Hassan)
    driver, created = User.objects.get_or_create(
        email='rakib.driver@digaxy.com',
        defaults={
            'username': 'rakibdriver',
            'first_name': 'Rakib',
            'last_name': 'Hassan',
            'role': 'driver',
            'phone': '+880 1812-987654',
            'address': 'Mirpur 10, Dhaka',
            'vehicle_type': 'Toyota Pickup Truck',
            'vehicle_reg_no': 'Dhaka Metro-U 14-8921',
            'is_online': True,
            'rating': 4.9,
            'completed_trips': 184,
            'today_earnings': 3450.00,
            'wallet_balance': 28400.00
        }
    )
    if created:
        driver.set_password('pass1234')
        driver.save()
        print("✓ Created driver: rakib.driver@digaxy.com / pass1234")

    # 4. Vehicles
    vehicles_data = [
        {
            'id_name': 'pickup',
            'name': 'Pickup Truck',
            'price_display': '$42.92 + $1.62',
            'unit': 'per labor min',
            'image_url': '/images/vehicles/pickup.jpg',
            'description': 'Perfect for small loads, single items, couches, or light studio moves.'
        },
        {
            'id_name': 'van',
            'name': 'Van',
            'price_display': '$77 + $2.02',
            'unit': 'per labor min',
            'image_url': '/images/vehicles/van.jpg',
            'description': 'Ideal for 1-bedroom apartments, boxes, appliances, and moderate furniture.'
        },
        {
            'id_name': 'mini_box',
            'name': 'Mini Box Truck',
            'price_display': '$144.51 + $2.30',
            'unit': 'per labor min',
            'image_url': '/images/vehicles/mini-box-truck.jpg',
            'description': 'Great for 2-bedroom homes, large bulky items, and heavier freight.'
        },
        {
            'id_name': 'box_truck_26',
            'name': '26-foot Box truck',
            'price_display': '$230 + $4.99',
            'unit': 'per labor min',
            'image_url': '/images/vehicles/box-truck-26ft.jpg',
            'description': 'Commercial scale for full 3-4 bedroom homes and extensive office relocations.'
        }
    ]

    vehicles = {}
    for v_data in vehicles_data:
        v, _ = Vehicle.objects.get_or_create(id_name=v_data['id_name'], defaults=v_data)
        vehicles[v_data['id_name']] = v
    print(f"✓ Seeded {len(vehicles)} vehicles.")

    # 5. Live Pending Move in Dhaka
    pickup_truck = vehicles['pickup']
    if not Booking.objects.filter(customer=user, status='pending').exists():
        b1 = Booking.objects.create(
            customer=user,
            vehicle=pickup_truck,
            pickup_address='Road 27, Dhanmondi, Dhaka',
            drop_address='Gulshan 1, Avenue 1, Dhaka',
            estimated_distance_km=9.8,
            estimated_duration_mins=35,
            total_fare=1450.00,
            payment_method='cash',
            items_description='1 Bed, 4 Boxes, 1 Refrigerator',
            status='pending'
        )
        print(f"✓ Seeded live pending move #{b1.id} for driver dispatches.")

    # 6. Past Completed Move
    van = vehicles['van']
    if not Booking.objects.filter(customer=user, status='delivered').exists():
        b2 = Booking.objects.create(
            customer=user,
            driver=driver,
            vehicle=van,
            pickup_address='Sector 7, Uttara, Dhaka',
            drop_address='Block C, Bashundhara R/A, Dhaka',
            estimated_distance_km=12.3,
            estimated_duration_mins=45,
            total_fare=2000.00,
            payment_method='bkash',
            items_description='Office equipment and study table',
            status='delivered'
        )
        DriverEarning.objects.get_or_create(
            driver=driver,
            booking=b2,
            defaults={
                'amount': 2000.00,
                'description': f"Move #{b2.id}: Sector 7, Uttara -> Block C, Bashundhara R/A"
            }
        )
        print(f"✓ Seeded completed move #{b2.id} with driver earnings record.")

    print("\nAll database seeding completed successfully!")

if __name__ == '__main__':
    seed()
