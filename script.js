document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');
    const cardstatsContainer = document.querySelector('.stats-cards');

    // Validate username with regex
    function validateUsername(username) {
        if (username.length < 3 || username.length > 20) {
            alert("Username must be between 3 and 20 characters.");
            return false;
        }
        if (username.trim() === "") {
            alert("Username cannot be empty.");
            return false;
        }
        const regex = /^[a-zA-Z0-9_]{1,20}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: `
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
                `,
                variables: { username: username }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl + targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Network response was not ok!");
            }

            const parsedData = await response.json();
            console.log("Fetched data: ", parsedData);

            displayUserData(parsedData);
        } catch (error) {
            statsContainer.innerHTML = `<p>No data found</p>`;
            console.error(error);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = total > 0 ? (solved / total) * 100 : 0;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData) {
        const allCounts = parsedData.data.allQuestionsCount;
        const acCounts = parsedData.data.matchedUser?.submitStats?.acSubmissionNum;

        if (!allCounts || !acCounts) {
            statsContainer.innerHTML = `<p>Unable to load stats</p>`;
            return;
        }

        const totalEasyQues = allCounts.find(q => q.difficulty === "EASY")?.count || 0;
        const totalMediumQues = allCounts.find(q => q.difficulty === "MEDIUM")?.count || 0;
        const totalHardQues = allCounts.find(q => q.difficulty === "HARD")?.count || 0;

        const solvedEasy = acCounts.find(q => q.difficulty === "EASY")?.count || 0;
        const solvedMedium = acCounts.find(q => q.difficulty === "MEDIUM")?.count || 0;
        const solvedHard = acCounts.find(q => q.difficulty === "HARD")?.count || 0;

        updateProgress(solvedEasy, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMedium, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHard, totalHardQues, hardLabel, hardProgressCircle);
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("logging username: ", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
