from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from knox.models import AuthToken
from core.user_models import User
from .category_model.category import Category
from .transaction_model.transaction import Transaction



# --------------------------
# User Registration
# --------------------------
class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({
                "password": ["Passwords must match."]
            })

        validate_password(password)

        if User.objects.filter(email=attrs.get('email')).exists():
            raise serializers.ValidationError({
                "email": ["A user with this email already exists."]
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User(
            name=validated_data['name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        token = AuthToken.objects.create(user=user)[1]

        return {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
            },
            "token": token
        }


# --------------------------
# User Login
# --------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)
        
        if not user:
            raise serializers.ValidationError("Invalid credentials")

        return {
            "user": user
        }


# --------------------------
# Category Serializer
# --------------------------
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type', 'created_at']
        read_only_fields = ['id', 'created_at']


# --------------------------
# Transaction Serializer
# --------------------------
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'amount', 'category', 'category_id', 'type', 'date', 'created_at']
        read_only_fields = ['id', 'created_at']

# class TransactionSerializer(serializers.ModelSerializer):
#     category = CategorySerializer(read_only=True)
#     category_id = serializers.PrimaryKeyRelatedField(
#         queryset=Category.objects.all(),
#         write_only=True,
#         source='category'
#     )

#     class Meta:
#         model = Transaction
#         fields = ['id', 'amount', 'category', 'category_id', 'type', 'date', 'created_at']
#         read_only_fields = ['id', 'created_at']
