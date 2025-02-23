#include "crow.h"

class Server {
	private:
		crow::SimpleApp m_app;
		int m_port;

		void SetupRoutes();

	public:
		Server(int port = 8080);
		void Run();
};
