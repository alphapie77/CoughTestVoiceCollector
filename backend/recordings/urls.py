from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.CoughRecordingCreateView.as_view(), name='recording-create'),
    path('list/', views.CoughRecordingListView.as_view(), name='recording-list'),
    path('detail/<uuid:recording_id>/', views.CoughRecordingDetailView.as_view(), name='recording-detail'),
    path('my-recordings/', views.UserRecordingsView.as_view(), name='user-recordings'),
    path('stats/', views.recording_stats, name='recording-stats'),
    path('export-csv/', views.export_csv, name='export-csv'),
    path('delete/<uuid:recording_id>/', views.delete_user_recording, name='delete-recording'),
]