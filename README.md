# LoadPilot 🚀

LoadPilot is a modern, real-time dashboard for monitoring and managing web traffic. Built with Next.js and powered by AI, it provides essential insights into your application's performance and health at a glance.

## ✨ Features

- **Real-time Dashboard**: Live metrics for request rate, error rate, and average latency, visualized with interactive charts.
- **Server Status Monitoring**: A comprehensive overview of all your server instances, including their status, region, IP, CPU load, and memory usage.
- **External Website Health Check**: An on-demand tool to check the status and response time of any external URL.
- **AI-Powered Session Analysis**: Utilizes Google's Genkit to analyze and categorize session descriptions, helping you understand user behavior and system interactions.
- **Responsive Design**: A clean, modern UI built with ShadCN and Tailwind CSS that works seamlessly across all devices.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **Containerization**: [Docker](https://www.docker.com/)
- **Load balancing**: [AWS EC2]
## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later recommended)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## 🐳 Dockerization

This application includes a `Dockerfile` to make it easy to build and run a production-ready container.

### Build the image

To build the Docker image, run the following command from the root of the project:

```bash
docker build -t loadpilot .
```

### Run the container

Once the image is built, you can run it as a container with this command:

```bash
docker run -p 9002:3000 loadpilot
```

The application will be accessible at `http://localhost:9002`.

