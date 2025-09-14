export default function NotificationHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trung tâm thông báo</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quản lý thông báo và cài đặt nhắc nhở
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Đánh dấu tất cả đã đọc
            </Button>
          )}
          <Badge variant="secondary" className="px-3 py-1">
            {unreadCount} chưa đọc
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notification List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filter Tabs */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {([
                  { key: 'all', label: 'Tất cả', count: notifications.length },
                  { key: 'unread', label: 'Chưa đọc', count: unreadCount },
                  { key: 'read', label: 'Đã đọc', count: notifications.length - unreadCount },
                ] as const).map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === key
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {label} ({count})
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border-l-4 transition-all hover:shadow-md ${!notification.read ? 'ring-2 ring-blue-50 dark:ring-blue-900/20' : ''
                    } ${getPriorityColor(notification.priority)}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold text-sm ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                              }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className={`text-sm ${!notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                            }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.priority === 'high' ? 'Ưu tiên cao' :
                                notification.priority === 'medium' ? 'Ưu tiên trung' : 'Ưu tiên thấp'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            Đánh dấu đã đọc
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {filter === 'unread' ? 'Không có thông báo chưa đọc' :
                      filter === 'read' ? 'Không có thông báo đã đọc' : 'Chưa có thông báo nào'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Các thông báo mới sẽ xuất hiện ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
