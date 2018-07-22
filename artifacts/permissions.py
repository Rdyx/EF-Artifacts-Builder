from rest_framework import permissions


class IsRequestMethodGet(permissions.BasePermission):
    """
    The request is a GET request.
    """

    def has_permission(self, request, view):
        return request.method == 'GET' # Returns True if GET request
