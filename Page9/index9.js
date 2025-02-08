document.addEventListener("DOMContentLoaded", () => {
    const tasks = [
        {
            company: "SwiftWeb Technologies",
            description: "Add a search and filter feature to an e-commerce website",
            image: "unsplash_xrVDYZRGdw4.svg"
        },
        {
            company: "NovaTech Solutions",
            description: "Fix bugs in an existing React.js project to improve performance",
            image: "unsplash_XJXWbfSo2f0.png"
        },
        {
            company: "TechSparc Solutions",
            description: "Develop a user-friendly dashboard to display real-time analytics for clients",
            image: "unsplash_uqx6IiVp18E.svg"
        },
        {
            company: "DevSynergy Labs",
            description: "Set up a Git repository for version control and teach the team basic Git workflows",
            image: "unsplash_jxelyjTrWFg.svg"
        },
        {
            company: "ByteForge Tech",
            description: "Optimize website performance for mobile devices by reducing load times",
            image: "unsplash_OqtafYT5kTw.svg"
        },
        {
            company: "WebNest Studios",
            description: "Redesign the homepage with a modern, responsive layout using HTML5 and CSS3",
            image: "unsplash_cvBBO4PzWPg.svg"
        }
    ];

    const taskContainer = document.getElementById("task-container");
    const ongoingTasksContainer = document.getElementById("ongoing-tasks");
    const searchInput = document.getElementById("search");

    function renderTasks(taskList) {
        taskContainer.innerHTML = "";
        taskList.forEach(task => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("task-card");
            taskCard.innerHTML = `
                <img src="${task.image}" alt="Task Image" style="width:100%; border-radius:10px;">
                <h3>${task.company}</h3>
                <p>Task: ${task.description}</p>
                <a href= "Group 113.svg"><button class="details-btn">Details</button></a>
                <button class="submit-btn">Start</button>
            `;
            taskContainer.appendChild(taskCard);

            taskCard.querySelector(".submit-btn").addEventListener("click", () => {
                addOngoingTask(task);
            });
        });
    }

    function addOngoingTask(task) {
        const ongoingTaskCard = document.createElement("div");
        ongoingTaskCard.classList.add("ongoing-task-card");
        ongoingTaskCard.innerHTML = `
            <span><strong>${task.company}</strong><br>Task: ${task.description}</span>
            <button class="submit-btn">Submit</button>
        `;
        ongoingTasksContainer.appendChild(ongoingTaskCard);
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task =>
            task.company.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
        renderTasks(filteredTasks);
    });

    renderTasks(tasks);
});