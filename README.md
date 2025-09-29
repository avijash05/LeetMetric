# 📊 LeetMetric

LeetMetric is a **modern, interactive dashboard** that fetches real-time LeetCode statistics via **GraphQL API** and visualizes problem-solving progress (Easy, Medium, Hard) using animated circular progress indicators. Built with **vanilla JavaScript**, **HTML5**, and **CSS3**, it provides an intuitive interface for developers to track their coding journey.

---

## 🚀 Features

* 🔎 **Username Search** – Enter any valid LeetCode username and fetch live data.
* 📡 **GraphQL API Integration** – Queries LeetCode’s public GraphQL endpoint seamlessly.
* 🎨 **Dynamic Progress Visualization** – Circular progress bars powered by `conic-gradient` for real-time difficulty-level tracking.
* ⚡ **Responsive Design** – Works across desktop and mobile devices.
* 🛡 **Username Validation** – Regex-based validation with custom alerts.
* 💡 **Error Handling** – Graceful fallback if user data is unavailable.

---

## 🖼️ UI Preview

> Example layout of the dashboard:

```
 ---------------------------------------
|             LeetMetric                |
|---------------------------------------|
| Enter Your Username Below :           |
| [   username input   ] [ Search ]     |
|---------------------------------------|
|    ○ Easy   ○ Medium   ○ Hard         |
|    125/500   200/1000   50/300        |
 ---------------------------------------
```

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **API:** LeetCode GraphQL Endpoint
* **Styling:** Flexbox, CSS variables, Conic-gradient progress rings
* **Proxy Handling:** CORS-anywhere (can be replaced with custom proxy or serverless function)

---

## 📂 Project Structure

```
LeetMetric/
├── index.html        # Main HTML file
├── style.css         # Styling for UI components
├── script.js         # Core logic: API fetch, validation, rendering
└── README.md         # Documentation
```

---

## ⚙️ Setup & Installation

1. **Clone Repository**

   ```bash
   git clone https://github.com/yourusername/leetmetric.git
   cd leetmetric
   ```

2. **Open Locally**

   * Simply open `index.html` in your browser.

3. **Enable CORS**

   * This project uses [cors-anywhere](https://cors-anywhere.herokuapp.com/).
   * Start your own proxy if the demo one is rate-limited:

     ```bash
     git clone https://github.com/Rob--W/cors-anywhere.git
     cd cors-anywhere
     npm install
     npm start
     ```
   * Update `proxyUrl` in `script.js` with your deployed CORS proxy.

---

## 📡 GraphQL Query

The app queries LeetCode’s GraphQL API for:

```graphql
query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}
```

---

## 🖥️ How It Works

1. User enters a **LeetCode username**.
2. `validateUsername()` ensures it matches regex rules.
3. `fetchUserDetails()` calls the GraphQL API.
4. Data is parsed, and problem counts (Easy, Medium, Hard) are extracted.
5. `updateProgress()` animates the circular progress bars dynamically.

---

## 🧑‍💻 Future Enhancements

* 🌐 Replace `cors-anywhere` with a custom **Node.js/Express proxy** or serverless function (Vercel/Netlify).
* 📊 Add **line/bar charts** for submission history and trends.
* 🏆 Display **ranking, streaks, and badges** from LeetCode API.
* 🎨 Dark/Light theme toggle.
* 🔔 User notification system for milestone achievements.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push branch (`git push origin feature-name`)
5. Create Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🌟 Acknowledgements

* [LeetCode GraphQL API](https://leetcode.com/graphql)
* [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
* CSS `conic-gradient` magic for progress rings

---

🔥 With **LeetMetric**, you can measure your growth, track your coding skills, and stay motivated on your LeetCode journey!
