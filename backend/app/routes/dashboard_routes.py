from flask import Blueprint

from controllers.dashboard_controller import DashboardController


dashboard_bp = Blueprint(
    'dashboard_bp',
    __name__
)

dashboard_bp.route(
    '/dashboard/statistics',
    methods=['GET']
)(DashboardController.get_statistics)