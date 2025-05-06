from django.db import models
from django.conf import settings
import uuid

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    RECURRING_FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='transactions')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    date = models.DateField()
    recurring = models.BooleanField(default=False) 
    recurring_frequency = models.CharField(
        max_length=10,
        choices=RECURRING_FREQUENCY_CHOICES,
        null=True,
        blank=True
    ) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.type.capitalize()} of {self.amount} on {self.date}"

    def is_recurring(self):
        """Returns True if the transaction is recurring."""
        return self.recurring

    def get_next_occurrence(self):
        """Logic to calculate the next occurrence of a recurring transaction."""
        if not self.is_recurring():
            return None
        
        from datetime import timedelta
        from django.utils import timezone

        next_occurrence = self.date
        
        if self.recurring_frequency == 'daily':
            next_occurrence += timedelta(days=1)
        elif self.recurring_frequency == 'weekly':
            next_occurrence += timedelta(weeks=1)
        elif self.recurring_frequency == 'monthly':
            next_occurrence = next_occurrence.replace(month=next_occurrence.month + 1 if next_occurrence.month < 12 else 1)
            next_occurrence = next_occurrence.replace(year=next_occurrence.year if next_occurrence.month > 1 else next_occurrence.year + 1)

        return next_occurrence if next_occurrence >= timezone.now().date() else None
