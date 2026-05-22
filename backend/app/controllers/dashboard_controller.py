from flask import jsonify

from services.dashboard_service import DashboardService

from utils.auth_middleware import (
    token_required
)


class DashboardController:

    @staticmethod
    @token_required
    def get_statistics():

        data = DashboardService.get_statistics()

        return jsonify(data)