# Zwijsen Nakijk App

The **Zwijsen Nakijk App** is a Nuxt-based web application that allows teachers to scan student tests, which are then processed using OCR/HTR technology. The results are displayed in a dashboard where teachers can confirm the scores and generate personalized feedback for students.

This project helps educators using Zwijsen test materials by reducing the time spent on grading.

---

## ⚙️ Installation

Make sure you have [Node.js](https://nodejs.org/) version **20.x or newer** and [pnpm](https://pnpm.io/) installed.
```bash
pnpm install
```

### 🔐 Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
AZURE_ENDPOINT=your_azure_endpoint
AZURE_STORAGE_CONTAINER_NAME=your_azure_container_name
```

---

## 🚀 Development

To start the development server:
```bash
pnpm dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📦 Build for Production

To generate a production build:
```bash
pnpm build
```

> Further deployment instructions will be added later.

---

## 🛠️ Technologies Used

* [Nuxt 3](https://nuxt.com/)
* [pnpm](https://pnpm.io/)
* [`sass-embedded`](https://www.npmjs.com/package/sass-embedded) for SCSS support
* [`@azure/storage-blob`](https://www.npmjs.com/package/@azure/storage-blob) for Azure Blob Storage integration

---

## 🤝 Contributing

This is a team project. Contributions are welcome!
* Please keep your code clean and readable.
* Open an issue if you encounter a bug or have a suggestion.

---

## 📬 Contact

If you have questions, feel free to open an issue on this repository.
